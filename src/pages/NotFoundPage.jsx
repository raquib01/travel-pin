import { Link } from "react-router-dom"
export default function NotFound(){
	return(
		<>
			<p>Error 404 Page Not Found</p>
			<Link to="/">Go Back to Home</Link>
		
		</>
	)
}