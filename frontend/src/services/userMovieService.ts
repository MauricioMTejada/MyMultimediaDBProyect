// src/services/userMovieService.ts
import { api } from '../utils/apiConfig';
import { CombinedMovieData, Country } from '../types/types';

export const fetchUserMovies = async (userId: number): Promise<CombinedMovieData[]> => {
    const response = await api.get(`/users/${userId}/movies`);
    return response.data;
};

export const fetchCountries = async (): Promise<Country[]> => {
    const response = await api.get('/countries');
    return response.data;
};
