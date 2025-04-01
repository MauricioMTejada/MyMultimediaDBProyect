// frontend/src/services/movieAssociationService.ts
import { api } from '../utils/apiConfig';

export const checkMovieAssociation = async (movieId: number): Promise<boolean> => {
    try {
        const response = await api.get(`/movies/${movieId}`);
        return response.data.isAssociated;
    } catch (error: any) {
        console.error('Error checking movie association:', error);
        throw error;
    }
};
