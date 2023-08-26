import { createContext, useContext, useEffect, useReducer } from "react";

const API_BASE = "http://127.0.0.1:8000";

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: "",
};

function reducer(state, action) {
	switch (action.type) {
		case "loading":
			return { ...state, isLoading: true };

		case "error":
			return { ...state, isLoading: false, error: action.payload };

		case "cities/loaded":
			return { ...state, isLoading: false, cities: action.payload };

		case "city/loaded":
			return { ...state, isLoading: false, currentCity: action.payload };

		case "city/created":
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
				currentCity: action.payload,
			};

		case "city/deleted":
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter((c) => c.id !== action.payload),
				currentCity: {},
			};

		default:
			throw new Error("Invalid action passed to reducer");
	}
}
const CitiesContext = createContext();

function CitiesProvider({ children }) {
	const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
		reducer,
		initialState,
	);

	useEffect(() => {
		async function fetchCities() {
			dispatch({type:"loading"});
			try {
				const res = await fetch(API_BASE + "/cities");
				const data = await res.json();
				dispatch({type:"cities/loaded",payload: data});
				
			} catch (err) {
				dispatch({type:"error",payload:err});
			}
		}

		fetchCities();
	}, []);

	async function loadCity(id) {
		if(Number(id)===currentCity.id) return;
		dispatch({type:"loading"});
		try{
			const res = await fetch(API_BASE + "/cities/" + id);
			const data = await res.json();
			dispatch({type:"city/loaded",payload: data});
		}catch(err){
			dispatch({type:"error",payload:err});
		}
	}

	async function createCity(newCity){
		dispatch({type:"loading"});
		try{
		const res = await fetch(API_BASE + "/cities",{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newCity)
		});

		const data = await res.json();
		dispatch({type:"city/created",payload:data});
	}catch(err){
			dispatch({type:"error",payload:err});
		}
	}

	async function deleteCity(id){
		dispatch({type:"loading"});
		try{
			await fetch(API_BASE + "/cities/" + id,{
				method:"DELETE",
			});
			dispatch({type:"city/deleted",payload: id});
		}catch(err){
			dispatch({type:"error",payload:err});
		}
	}
	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				error,
				loadCity,
				createCity,
				deleteCity

			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);
	if(!context){
		throw new Error("Cant use cities context outside cities provider"); 
	} 
	return context;
}

export { CitiesProvider, useCities };
