import styles from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
export default function Header() {
	return (
		<header className={styles.header}>
			<Link to="/" className={styles.logo}>
				<img src="/logo.png" alt="travel pin" />
				<span>Travel Pin</span>
			</Link>
			<nav className={styles.nav}>
				<NavLink to="/about" className={styles.navLink}>
					ABOUT
				</NavLink>
				<NavLink to="/login" className={styles.navLink}>
					LOGIN
				</NavLink>
			</nav>
		</header>
	);
}
