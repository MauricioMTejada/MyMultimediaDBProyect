// frontend/src/components/Login.tsx
import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { loginUser } from '../services/authService';
import { loginFailure, loginStart, loginSuccess } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); // Estado para el error
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginStart());
        setError(null); // Limpiar el error al intentar iniciar sesión
        try {
            const data = await loginUser({ username, password });
            dispatch(loginSuccess(data.userId));
            localStorage.setItem('token', data.token); // Guardar el token
            localStorage.setItem('userId', data.userId); // Guardar el userId
            navigate('/'); // Redirigir a la página principal
        } catch (error: any) {
            dispatch(loginFailure(error.message));
            setError(error.message); // Mostrar el error
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Usuario
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>} {/* Mostrar el error */}
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Iniciar Sesión
                    </button>
                    <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        Registrarse
                    </Link>
                </div>
            </form>
        </div>
    );
  };

  export default Login;
