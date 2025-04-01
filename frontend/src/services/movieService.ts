import { api } from '../utils/apiConfig';
import { Movie, Country } from '../types/types';

// Función para obtener todas las películas
export const fetchMovies = async (): Promise<Movie[]> => {
    try {
        const response = await api.get<Movie[]>('/movies');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al obtener las películas');
    }
};

// Función para obtener todos los países
export const fetchCountries = async (): Promise<Country[]> => {
    try {
        const response = await api.get<Country[]>('/countries');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al obtener los países');
    }
};
