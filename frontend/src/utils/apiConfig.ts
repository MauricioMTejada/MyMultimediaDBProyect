// frontend/src/utils/apiConfig.ts
import axios from 'axios';
import { store } from '../redux/store'; // Importar el store de Redux

export const api = axios.create({
    baseURL: 'http://localhost:3000', // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token a los headers
api.interceptors.request.use(
    (config) => {
        const state = store.getState(); // Obtener el estado completo de Redux
        // console.log('Interceptor - Estado de Redux:', state); // Verificar el estado completo
        const token = state.auth.token; // Obtener el token del estado de Redux
        // console.log('Interceptor - Token:', token); // Verificar el token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
