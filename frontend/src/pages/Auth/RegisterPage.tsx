// frontend/src/pages/Auth/RegisterPage.tsx
import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { registerUser } from '../../services/authService';
import { registerFailure, registerStart, registerSuccess } from '../../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import styles from './RegisterPage.module.css';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerStart());
        setError(null);
        try {
            const data = await registerUser({ username, email, password, firstName, lastName });
            dispatch(registerSuccess({ token: data.token, userId: data.userId }));
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId.toString());
            navigate('/');
        } catch (error: any) {
            dispatch(registerFailure(error.message));
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
                    />
                </div>
                <div className="mb-4">
                    <label className={styles.label} htmlFor="email">
                        Email
                    </label>
                    <input
                        className={styles.input}
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className={styles.label} htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        className={styles.input}
                        id="password"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className={styles.label} htmlFor="firstName">
                        Nombre
                    </label>
                    <input
                        className={styles.input}
                        id="firstName"
                        type="text"
                        placeholder="Nombre"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className={styles.label} htmlFor="lastName">
                        Apellido
                    </label>
                    <input
                        className={styles.input}
                        id="lastName"
                        type="text"
                        placeholder="Apellido"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.button}
                        type="submit"
                    >
                        Registrarse
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
