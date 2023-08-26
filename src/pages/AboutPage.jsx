import styles from "./AboutPage.module.css";
import Header from "../components/Header"
export default function AboutPage() {
	return (
		<div className={styles.about}>
			<Header/>
			<div className={styles.main}>

			<h1>Travel Pin: It keeps track of your visited space around the world</h1>
			<p>
				Travel Pin is your virtual travel companion that lets you immortalize
				your journeys. Seamlessly bookmark every location youve explored, and
				relive those moments on an interactive map. Capture memories with
				personalized notes, visualize your route, and share your adventures with
				fellow explorers. With Travel Pin, your travel story becomes a vibrant
				map of cherished experiences.
			</p>
			</div>
		</div>
	);
}
