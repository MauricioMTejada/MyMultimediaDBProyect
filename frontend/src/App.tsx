// src/App.tsx
import { useEffect } from 'react';
import UploadMovies from "./components/UploadMovies";
import AllMovies from "./components/AllMovies";
import { Link, Routes, Route } from "react-router-dom"; // Elimina BrowserRouter
import UserMoviesPage from "./components/movies/UserMoviesPage";
import Login from './components/Login';
import Logout from './components/Logout';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkLoginStatusStart, checkLoginStatusSuccess } from './redux/slices/authSlice';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';

const SeriesPage = () => (
    <div className="p-4">
        <h2 className="text-2xl font-bold">Series</h2>
    </div>
);

const HomePage = () => (
    <div className="p-4">
        <h2 className="text-2xl font-bold">Home</h2>
        <UploadMovies />
        <AllMovies />
    </div>
);

function App() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const userId = useAppSelector((state) => state.auth.userId);

    useEffect(() => {
        dispatch(checkLoginStatusStart());
        // Aquí iría la lógica para comprobar si hay un token en localStorage
        // Por ahora, simulamos que no hay nadie logueado
        const storedUserId = localStorage.getItem('userId'); // O localStorage.getItem('userId');
        if (storedUserId) {
            dispatch(checkLoginStatusSuccess(parseInt(storedUserId)));
        } else {
            dispatch(checkLoginStatusSuccess(null));
        }
    }, [dispatch]);

    return (
        <div className="bg-gray-100 min-h-screen"> {/* Reemplaza BrowserRouter por un div */}
            <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="hover:underline">
                            Home
                        </Link>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <Link to="/movies" className="hover:underline">
                                Películas
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link to="/series" className="hover:underline">
                            Series
                        </Link>
                    </li>
                </ul>
                <div className="flex space-x-4">
                    {isLoggedIn ? (
                        <>
                            <span className="text-white">Usuario ID: {userId}</span>
                            <Logout />
                        </>
                    ) : (
                        <Link to="/login" className="hover:underline">
                            Login
                        </Link>
                    )}
                </div>
            </nav>
            <Routes> {/* Routes y Route se mantienen */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/series" element={<SeriesPage />} />
                <Route
                    path="/movies"
                    element={
                        <ProtectedRoute>
                            <UserMoviesPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
