// frontend/src/App.tsx
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPages from './pages/Auth/LoginPage';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getJwtFromLocalStorage, getUserIdFromLocalStorage } from './services/authService';
import { ProtectedRoutes } from './routes';
import RegisterPage from './pages/Auth/RegisterPage';
import Navbar from './components/NavBar';
import { HomePage, SeriesPage, UserMoviesPage, UploadMoviesPage } from './pages';
import { checkLoginStatusSuccess } from './redux/slices/authSlice';
import { loadUserMovies } from './redux/slices/userMovieSlice'; // Importa la nueva acción

function App() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn); // Obtener el estado de isLoggedIn

    useEffect(() => {
        const token = getJwtFromLocalStorage();
        const userId = getUserIdFromLocalStorage();

        if (token) {
            dispatch(checkLoginStatusSuccess({ token, userId })); // Sincroniza el token con Redux directamente
        }
    }, [dispatch]);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadUserMovies()); // Carga las películas del usuario
        }
    }, [isLoggedIn, dispatch]);

    const navLinks = [
        { label: 'Home', to: '/' },
        { label: 'Películas', to: '/movies' },
        { label: 'Series', to: '/series' },
        { label: 'Subir Datos', to: '/uploadmovie' },
    ];

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar links={navLinks} title="MyMultimediaDB" />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPages />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/series" element={<SeriesPage />} />
                <Route path="/uploadmovie" element={<UploadMoviesPage />} />
                <Route
                    path="/movies"
                    element={
                        <ProtectedRoutes>
                            <UserMoviesPage />
                        </ProtectedRoutes>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
