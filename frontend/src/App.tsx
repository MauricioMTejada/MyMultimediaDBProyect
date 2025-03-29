// frontend/src/App.tsx
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserMoviesPage from './components/movies/UserMoviesPage';
import Login from './components/Login';
import { useAppDispatch } from './redux/hooks';
import { checkLoginStatusStart, checkLoginStatusSuccess } from './redux/slices/authSlice';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import Navbar from './components/NavBar';
import { HomePage, SeriesPage } from './pages';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkLoginStatusStart());
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            dispatch(checkLoginStatusSuccess(parseInt(storedUserId)));
        } else {
            dispatch(checkLoginStatusSuccess(null));
        }
    }, [dispatch]);

    const navLinks = [
        { label: 'Home', to: '/' },
        { label: 'Películas', to: '/movies' },
        { label: 'Series', to: '/series' },
    ];

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar links={navLinks} title="MyMultimediaDB" />
            <Routes>
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
