import MapPanel from "../components/MapPanel";
import SidePanel from "../components/SidePanel";
import styles from "./MainPage.module.css"
export default function MainPage(){

	return(
		<div className={styles.main}>
			<SidePanel />
			<MapPanel/>
		</div>
	)
}