import { useNavigate, useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";

const formatDate = (isoDate) => {
	if (!isoDate) return "";
	return new Intl.DateTimeFormat("en-US", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(new Date(isoDate));
};

export default function Detail() {
	const { loadCity, currentCity, isLoading } = useCities();
	const { id } = useParams();

	useEffect(() => {
		loadCity(id);
	}, [id, loadCity]);
	const navigate = useNavigate();

	if (isLoading) return <span style={{ color: "white" }}>Loading.....</span>;

	return (
		<div className={styles.detail}>
			<p>
				City: <span>{currentCity.cityName}</span>
			</p>
			<p>
				Country: <span>{currentCity.country}</span>
			</p>
			<p>
				Date: <span>{formatDate(currentCity.date)}</span>
			</p>
			<p>
				Notes: <span>{currentCity.notes}</span>
			</p>
			<button onClick={() => navigate(-1)} className={styles.detailBtn}>
				Back
			</button>
		</div>
	);
}
