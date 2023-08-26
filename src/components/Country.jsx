import styles from "./Country.module.css";
import { useCities } from "../contexts/CitiesContext";

export default function Country() {
	const { cities, isLoading } = useCities();

	if (isLoading) return <span style={{ color: "white" }}>Loading.....</span>;

	if (!cities.length)
		return (
			<span style={{ color: "white" }}>Add city to display here.....</span>
		);

	// fetching unique coutries and emoji from cities
	const countries = cities.reduce((countries, currCity) => {
		if (!countries.map((c) => c.country).includes(currCity.country)) {
			return [
				...countries,
				{ country: currCity.country, emoji: currCity.emoji },
			];
		} else {
			return countries;
		}
	}, []);

	return (
		<div className={styles.country}>
			<ul>
				{countries.map((c) => {
					return <li key={c.country}>{c.emoji + " " + c.country}</li>;
				})}
			</ul>
		</div>
	);
}
