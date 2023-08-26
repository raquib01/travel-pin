import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./MapPanel.module.css";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
export default function MapPanel() {
	const { cities } = useCities();
	const [mapPos, setMapPos] = useState([10, 10]);
	const [position] = useSearchParams();
	const lat = position.get("lat");
	const lng = position.get("lng");
	useEffect(() => {
		if (lat && lng) {
			setMapPos([lat, lng]);
		}
	}, [lat, lng]);

	return (
		<div className={styles.mapPanel} id="map">
			<MapContainer
				className={styles.map}
				center={mapPos}
				zoom={6}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{cities.map((c) => (
					<Marker position={[c.position.lat, c.position.lng]} key={c.id}>
						<Popup>{`${c.emoji} ${c.cityName}`}</Popup>
					</Marker>
				))}
				<ChangeCenter position={mapPos} />
				<DetectClick />
				<MyLocation />
			</MapContainer>
		</div>
	);
}

function ChangeCenter({ position }) {
	// center in MapContainer is not responsive
	const map = useMap();
	map.flyTo(position,8);
	return null;
}

function DetectClick() {
	const navigate = useNavigate();
	useMapEvent({
		click: (e) => {
			navigate(`entry?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
		},
	});

	return null;
}

function MyLocation() {
	const map = useMap();
	const navigate = useNavigate();
	useMapEvent({
		locationfound: (e) => {
				navigate(`entry?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
		},
	});
	function getLocation() {
		map.locate();
	}
	return (
		<button className={styles.locateBtn} onClick={getLocation}>
			Use My Location
		</button>
	);
}
