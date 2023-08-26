import styles from "./SidePanel.module.css";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function SidePanel() {
	return (
		<aside className={styles.sidepanel}>
			<div className={styles.logo}>
				<Link to="/" className={styles.logo}>
					<img src="/logo.png" alt="travel pin" />
					<span>Travel Pin</span>
				</Link>
			</div>
			<div className={styles.toggle}>
				<NavLink to="/main/city">Cities</NavLink>
				<NavLink to="/main/country">Countries</NavLink>
			</div>

			<Outlet />
			<footer className={styles.footer}>
				<p>&amp;Copyright 2023 by TravelPin</p>
			</footer>
		</aside>
	);
}
