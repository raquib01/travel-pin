import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import Cities from "./components/Cities";
import Country from "./components/Country";
import Detail from "./components/Detail";
import Entry from "./components/Entry";
import { CitiesProvider } from "./contexts/CitiesContext";

export default function App() {
	return (
		<CitiesProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/About" element={<AboutPage />} />
					<Route path="/main" element={<MainPage />}>
						{/* Directly navigate to /main/city*/}
						<Route index element={<Navigate replace to="city" />} />
						<Route path="city" element={<Cities />} />
						<Route path="city/:id" element={<Detail />} />
						<Route path="country" element={<Country />} />
						<Route path="entry" element={<Entry />} />
					</Route>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</CitiesProvider>
	);
}
