// frontend/src/pages/Auth/LogoutPage.tsx
import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import styles from './LogoutPage.module.css';

const LogoutPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <button onClick={handleLogout} className={styles.button}>
            Logout
        </button>
    );
};

export default LogoutPage;
