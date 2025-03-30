// src/services/movieAssociationService.ts
import { api } from '../utils/apiConfig';

export const checkMovieAssociation = async (userId: number, movieId: number): Promise<{ isAssociated: boolean }> => {
    try {
        const response = await api.get(`/users/${userId}/movies/${movieId}`);
        return response.data;
    } catch (error: any) {
        console.error('Error checking movie association:', error);
        throw error;
    }
};
