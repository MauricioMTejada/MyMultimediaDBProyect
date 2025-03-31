// frontend/src/services/authService.ts
import { LoginCredentials, UserData } from '../types/types';
import { api } from '../utils/apiConfig';

// Función para obtener el token JWT del localStorage
export const getJwtFromLocalStorage = (): string | null => {
    try {
        const token = localStorage.getItem('token');
        return token ? token : null;
    } catch (error) {
        console.error('Error al obtener el token del localStorage:', error);
        return null;
    }
};

// Función para obtener el userId del localStorage
export const getUserIdFromLocalStorage = (): number | null => {
    try {
        const userId = localStorage.getItem('userId');
        return userId ? parseInt(userId, 10) : null;
    } catch (error) {
        console.error('Error al obtener el userId del localStorage:', error);
        return null;
    }
};

// Función para iniciar sesión
export const loginUser = async (credentials: LoginCredentials): Promise<UserData> => {
    try {
        // console.log('authService.ts - Credenciales enviadas:', credentials); // Verificar credenciales
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
};

// Función para registrar un nuevo usuario
export const registerUser = async (userData: any): Promise<any> => {
    try {
        const response = await api.post('/auth/register', userData);
        await api.get('/auth/check');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al registrar usuario');
    }
};

// Función para cerrar sesión
export const logoutUser = async () => {
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        // Optionally, make a request to the backend to invalidate the token
        // await api.post('/auth/logout');
    } catch (error) {
        console.error('Error during logout:', error);
        // Handle error appropriately, maybe show a message to the user
    }
};

// Función para refrescar el token (si se implementan tokens de refresco)
export const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken'); // Assuming you store a refresh token
        if (!refreshToken) {
            throw new Error('No refresh token found');
        }
        const response = await api.post('/auth/refresh', { refreshToken });
        const newToken = response.data.token;
        localStorage.setItem('token', newToken);
        // Optionally, update the refresh token if the server returns a new one
        // localStorage.setItem('refreshToken', response.data.refreshToken);
        return newToken;
    } catch (error: any) {
        console.error('Error refreshing token:', error);
        // Handle error appropriately, maybe redirect to login
        throw new Error(error.response?.data?.message || 'Error refreshing token');
    }
};

// Función para establecer el token y el userId en el localStorage
export const setTokenAndUserIdInLocalStorage = (token: string, userId: number) => {
    try {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId.toString());
    } catch (error) {
        console.error('Error setting token and userId in localStorage:', error);
    }
};

// Función para limpiar el localStorage
export const clearLocalStorage = () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
};

// Función para obtener datos adicionales del usuario
export const getUserData = async () => {
    try {
        const response = await api.get('/auth/user'); // Assuming you have an endpoint to get user data
        return response.data;
    } catch (error: any) {
        console.error('Error getting user data:', error);
        throw new Error(error.response?.data?.message || 'Error getting user data');
    }
};

// Función para actualizar los datos del usuario
export const updateUserData = async (userData: any) => {
    try {
        const response = await api.put('/auth/user', userData); // Assuming you have an endpoint to update user data
        return response.data;
    } catch (error: any) {
        console.error('Error updating user data:', error);
        throw new Error(error.response?.data?.message || 'Error updating user data');
    }
};

// Función para eliminar el usuario
export const deleteUser = async () => {
    try {
        const response = await api.delete('/auth/user'); // Assuming you have an endpoint to delete user
        return response.data;
    } catch (error: any) {
        console.error('Error deleting user:', error);
        throw new Error(error.response?.data?.message || 'Error deleting user');
    }
};
