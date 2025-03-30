// frontend/src/App.tsx
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPages from './pages/Auth/LoginPage';
import { useAppDispatch } from './redux/hooks';
import { checkLoginStatusStart, checkLoginStatusSuccess, logout } from './redux/slices/authSlice';
import { ProtectedRoutes } from './routes';
import RegisterPage from './pages/Auth/RegisterPage';
import Navbar from './components/NavBar';
import { HomePage, SeriesPage, UserMoviesPage, UploadMoviesPage } from './pages';
import { getJwtFromLocalStorage } from './services/authService';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkLoginStatusStart());
        const token = getJwtFromLocalStorage();
        if (token) {
            dispatch(checkLoginStatusSuccess(token));
        } else {
            dispatch(logout());
        }
    }, [dispatch]);

    const navLinks = [
        { label: 'Home', to: '/' },
        { label: 'Películas', to: '/movies' },
        { label: 'Series', to: '/series' },
        { label: 'Subir Película', to: '/uploadmovie' },
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
