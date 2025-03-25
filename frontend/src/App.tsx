// src/App.tsx
// import RandomCountries from "./components/RandomCountries";
import UploadMovies from "./components/UploadMovies";
import AllMovies from "./components/AllMovies";
import { Link, Routes, Route } from "react-router-dom"; // Importa solo lo necesario

// Create dummy components for Movies and Series pages
const MoviesPage = () => (
	<div className="p-4">
		<h2 className="text-2xl font-bold">Movies</h2>
		{/* Add your movies content here */}
	</div>
);

const SeriesPage = () => (
	<div className="p-4">
		<h2 className="text-2xl font-bold">Series</h2>
		{/* Add your series content here */}
	</div>
);

const HomePage = () => (
	<div className="p-4">
		<h2 className="text-2xl font-bold">Home</h2>
		{/* <RandomCountries /> */}
		<UploadMovies />
		<AllMovies />
	</div>
);

function App() {
	return (
		<div className="bg-gray-100 min-h-screen">
			{" "}
			{/* Elimina BrowserRouter de aquí */}
			{/* Navigation Bar */}
			<nav className="bg-blue-500 p-4 text-white">
				<ul className="flex space-x-4">
					<li>
						<Link to="/" className="hover:underline">
							Home
						</Link>
					</li>
					<li>
						<Link to="/movies" className="hover:underline">
							Películas
						</Link>
					</li>
					<li>
						<Link to="/series" className="hover:underline">
							Series
						</Link>
					</li>
				</ul>
			</nav>
			{/* Page Content */}
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/movies" element={<MoviesPage />} />
				<Route path="/series" element={<SeriesPage />} />
			</Routes>
		</div>
	);
}

export default App;
