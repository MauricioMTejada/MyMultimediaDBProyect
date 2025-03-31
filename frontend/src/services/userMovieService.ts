// frontend/src/services/userMovieService.ts
import { api } from '../utils/apiConfig';
import { CombinedMovieData, Country } from '../types/types';

export const fetchUserMovies = async (): Promise<CombinedMovieData[]> => {
    try {
        const response = await api.get('/usermovies');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al obtener las películas del usuario');
    }
};

export const fetchCountries = async (): Promise<Country[]> => {
    try {
        const response = await api.get('/countries');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al obtener los paises');
    }
};

export const updateUserMovie = async (userMovieId: number, watched: string): Promise<void> => {
    try {
        await api.put(`/usermovies/${userMovieId}`, { watched });
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al actualizar el estado de visto');
    }
};
