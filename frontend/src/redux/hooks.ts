// frontend/src/redux/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';
import { API_BASE_URL } from '../utils/apiConfig';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Función para realizar peticiones con el token
export const fetchWithToken = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
        ...options.headers,
        'Authorization': token ? `Bearer ${token}` : '',
    };

    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la petición');
    }

    return await response.json();
};
