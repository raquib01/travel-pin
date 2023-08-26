import { Link } from "react-router-dom";
import styles from "./Cities.module.css";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (isoDate) => {
	if(!isoDate) return "";
	return new Intl.DateTimeFormat("en-US", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(new Date(isoDate));
};
export default function Cities() {
	const { cities, isLoading, currentCity, deleteCity } = useCities();
	
	function handleDelete(e, id) {
		e.preventDefault();
		deleteCity(id);
	}
	if (isLoading) return <span style={{ color: "white" }}>Loading.....</span>;
	return (
		<div className={styles.cities}>
			<ul>
				{!cities.length ? (
					<span style={{ color: "white" }}>Add city to display here.....</span>
				) : (
					cities.map((c) => {
						return (
							<li key={c.id}>
								<Link
									className={`${
										currentCity.id === c.id ? styles.activeItem : ""
									} ${styles.item}`}
									to={`${c.id}?lat=${c.position.lat}&lng=${c.position.lng}`}
								>
									<div className={styles.nameHolder}>
										<p>
											{c.emoji} {c.cityName}
										</p>
										<p>
											{formatDate(c.date)}
										</p>
									</div>
									<div>
										<span className={styles.cross} onClick={(e) => handleDelete(e, c.id)}>x</span>

									</div>	
								</Link>
							</li>
						);
					})
				)}
			</ul>
		</div>
	);
}
