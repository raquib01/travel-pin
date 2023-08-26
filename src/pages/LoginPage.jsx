import Header from "../components/Header";
import styles from "./LoginPage.module.css";
export default function LoginPage() {
	return (
		<div className={styles.loginDiv}>
			<Header/>
			<form action="">
				<label htmlFor="email">Email Address</label>
				<input type="email" name="email" id="email" />
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
				<button type="submit">Login</button>
			</form>
		</div>
	);
}
