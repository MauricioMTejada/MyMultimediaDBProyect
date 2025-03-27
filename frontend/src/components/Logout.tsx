// frontend/src/components/Logout.tsx
import React from 'react';
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token'); // Eliminar el token
        localStorage.removeItem('userId'); // Eliminar el userId
        navigate('/login'); // Redirigir a la página de login
    };

    return (
        <button onClick={handleLogout} className="hover:underline">
            Logout
        </button>
    );
};

export default Logout;
