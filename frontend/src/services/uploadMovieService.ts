// src/services/uploadMovieService.ts
import { api } from '../utils/apiConfig';
import { Movie } from '../types/types';

export const uploadMovies = async (movies: Movie[]): Promise<void> => {
    try {
        // console.log('Uploading movies:', movies); // Log the movies being uploaded
        const response = await api.post('/movies/upload', movies);
        if (response.status !== 200) {
            throw new Error(`Error al cargar los datos: ${response.statusText}`);
        }
    } catch (error: any) {
        console.error('Error uploading movies:', error);
        throw new Error(`Error de conexión: ${error.message}`);
    }
};
