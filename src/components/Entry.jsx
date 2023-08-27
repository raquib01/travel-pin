import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Entry.module.css";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";

const API_BASE = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

export default function Entry() {
	const { createCity } = useCities();
	const [entry, setEntry] = useState({
		cityName: "",
		country: "",
		notes: "",
		date: "",
		emoji: "",
	});
	const [position] = useSearchParams();
	const navigate = useNavigate();
	const lat = position.get("lat");
	const lng = position.get("lng");

	// for reverse geoLocation
	const [geoLoading, setGeoLoading] = useState(false);
	const [geoError, setGeoError] = useState("");

	useEffect(() => {
		if (!lat && !lng) return;
		async function getCityData() {
			try {
				setGeoLoading(true);
				setGeoError("");
				const res = await fetch(
					`${API_BASE}?latitude=${lat}&longitude=${lng}&localityLanguage=en`
				);
				const data = await res.json();

				if (!data.countryCode) {
					throw new Error("Cant fetch country, try clicking somewhere nearby");
				}
				setEntry({
					cityName:
						data.city === data.locality
							? data.city
							: `${data.city} ${data.locality}`,
					country: data.countryName,
					emoji: convertToEmoji(data.countryCode),
				});
			} catch (err) {
				setGeoError(err.message);
			} finally {
				setGeoLoading(false);
			}
		}
		getCityData();
	}, [lat, lng]);

	async function handleSubmit(e) {
		e.preventDefault();
		if (!entry.cityName || !entry.date) return;
		await createCity({
			...entry,
			position: {
				lat,
				lng,
			},
		});
		navigate("/main/city");
	}
	if (!lat || !lng)
		return <span style={{ color: "white" }}>Click Somewhere on the map.</span>;
	if (geoLoading) return <span style={{ color: "white" }}>Loading.....</span>;
	if (geoError)
		return <span style={{ color: "white" }}>{geoError.message}</span>;

	return (
		<div className={styles.entry}>
			<form action="" onSubmit={handleSubmit}>
				<label htmlFor="city">City name</label>
				<input
					type="text"
					name="city"
					id="city"
					value={entry.cityName}
					onChange={(e) => setEntry({ ...entry, cityName: e.target.value })}
				/>
				<label htmlFor="country">When did you go for the trip?</label>
				<input
					type="text"
					name="country"
					id="country"
					value={entry.country}
					onChange={(e) => setEntry({ ...entry, country: e.target.value })}
				/>
				<label htmlFor="date">When did you go for the trip?</label>
				<DatePicker
					selected={entry.date}
					id="date"
					onChange={(d) => setEntry({ ...entry, date: d })}
					dateFormat="dd-MMM-yyyy"
					placeholderText="dd-mmm-yyyy"
					value={entry.date}
				/>
				<label htmlFor="note">Note(if Any)</label>
				<input
					type="text"
					name="note"
					id="note"
					value={entry.notes}
					onChange={(e) => setEntry({ ...entry, notes: e.target.value })}
				/>
				<div>
					<button
						onClick={(e) => {
							e.preventDefault();
							navigate(-1);
						}}
					>
						Back
					</button>
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
}
