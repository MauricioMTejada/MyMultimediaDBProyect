// frontend/src/pages/Auth/LoginPage.tsx
import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../services/authService';
import { loginFailure, loginStart, loginSuccess } from '../../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginStart());
        setError(null);
        try {
            const data = await loginUser({ username, password });
            dispatch(loginSuccess({ token: data.token, userId: data.userId }));
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId.toString());
            navigate('/');
        } catch (error: any) {
            dispatch(loginFailure(error.message));
            setError(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className="mb-4">
                    <label className={styles.label} htmlFor="username">
                        Usuario
                    </label>
                    <input
                        className={styles.input}
                        id="username"
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                    />
                </div>
                <div className="mb-6">
                    <label className={styles.label} htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        className={styles.inputPassword}
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.button}
                        type="submit"
                    >
                        Iniciar Sesión
                    </button>
                    <Link to="/register" className={styles.registerLink}>
                        Registrarse
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
