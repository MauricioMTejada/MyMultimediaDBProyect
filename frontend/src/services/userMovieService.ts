// frontend/src/services/userMovieService.ts
import { api } from '../utils/apiConfig';
import { CombinedMovieData, Country } from '../types/types';

export const fetchUserMovies = async (): Promise<CombinedMovieData[]> => {
    try {
        const response = await api.get('users/usermovies');
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

export const addAssociateUserMovieService = async (
    movieId: number,
    userMovieData: CombinedMovieData,
    onSuccess: (newUserMovie: CombinedMovieData) => void // Callback para actualizar Redux
): Promise<void> => {
    try {
        const response = await api.post(`/users/movies/${movieId}`);
        if (!response.status.toString().startsWith('2')) {
            throw new Error('Error al asociar la película');
        }
        console.log(`Película con ID ${movieId} asociada exitosamente.`);
        onSuccess(userMovieData); // Llamar al callback con los datos de la película
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al asociar la película');
    }
};

export const deleteAssociateUserMovieService = async (movieId: number): Promise<void> => {
    try {
        const response = await api.delete(`/users/movies/${movieId}`);
        if (!response.status.toString().startsWith('2')) {
            throw new Error('Error al eliminar la asociación de la película');
        }
        console.log(`Asociación de la película con ID ${movieId} eliminada exitosamente.`);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al eliminar la asociación de la película');
    }
};
