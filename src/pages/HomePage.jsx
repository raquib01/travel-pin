import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";
export default function HomePage() {
	return (
		<div className={styles.home}>
			<Header />
			<div className={styles.heroDiv}>
				<h1 className={styles.heroText}>You travel the world.</h1>
				<h1 className={styles.heroText}>
					Travel Pin keeps track of your adventures.
				</h1>
				<p className={styles.heroSubtext}>
					A world map that tracks your footsteps into every city you can think
					of. Never forget your wonderful experiences, and show your friends how
					you have wandered the world.
				</p>
				<Link to="main" className={styles.btnStart}>
					START TRACKING NOW
				</Link>
			</div>
		</div>
	);
}
