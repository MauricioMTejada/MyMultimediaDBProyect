// frontend/src/services/authService.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginCredentials, UserData } from '../types/types';
import { api } from '../utils/apiConfig';

export const getJwtFromLocalStorage = (): string | null => {
    return localStorage.getItem('token');
};

export const loginUser = async (credentials: LoginCredentials): Promise<UserData> => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
};

export const registerUser = async (userData: any): Promise<any> => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al registrar usuario');
    }
};

export const checkLoginStatus = createAsyncThunk('auth/checkLoginStatus', async (_, { rejectWithValue }) => {
    const token = getJwtFromLocalStorage();
    if (!token) {
        return rejectWithValue('No hay token');
    }
    try {
        const response = await api.get('/auth/check', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Error al verificar el estado de inicio de sesión');
    }
});
