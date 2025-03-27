// frontend/src/services/authService.ts
import { API_BASE_URL } from '../utils/apiConfig';

interface LoginCredentials {
    username: string;
    password: string;
}

interface RegisterUserData {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export const loginUser = async (credentials: LoginCredentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el login');
    }

    const data = await response.json();
    return data; // { token, userId }
};

export const registerUser = async (userData: RegisterUserData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el registro');
    }

    return await response.json();
};
