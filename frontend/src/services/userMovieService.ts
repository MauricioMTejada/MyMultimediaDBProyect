// frontend/src/services/userMovieService.ts
import { api } from '../utils/apiConfig';
import { MovieWithUserMovie, Country, UserMovie } from '../types/types';

export const fetchUserMovies = async (): Promise<MovieWithUserMovie[]> => {
    try {
        // console.log("Fetching user movies..."); // Log para indicar que se inicia la solicitud
        const response = await api.get('users/usermovies');
        // console.log("Response status:", response.status); // Log para ver el estado de la respuesta
        // console.log("Response data:", response.data); // Log para inspeccionar los datos de la respuesta
        return response.data;
    } catch (error: any) {
        console.error("Error response:", error.response); // Log para inspeccionar el error completo
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

export const addAssociateUserMovieService = async (movieId: number): Promise<UserMovie> => {
    try {
        const response = await api.post(`/users/movies/${movieId}`);

        if (response.status === 201) {
            console.log("El registro ha sido creado:", response.data);
        } else if (response.status === 200) {
            console.log("El registro ya existe y se ha reactivado:", response.data);
        } else if (response.status === 409) {
            console.log("El registro ya existe y está activo.");
        }

        return response.data.userMovie; // Retornar los datos de la película asociada
    } catch (error: any) {
        console.error(
            error.response?.data?.message || "Error al asociar la película"
        );
        throw new Error(
            error.response?.data?.message || "Error al asociar la película"
        );
    }
};

export const deleteAssociateUserMovieService = async (movieId: number): Promise<void> => {
    try {
        const response = await api.put(`/users/movies/${movieId}`); // Usar PUT con la misma ruta
        if (!response.status.toString().startsWith('2')) {
            throw new Error('Error al desactivar la asociación de la película');
        }
        console.log(`Asociación de la película con ID ${movieId} desactivada exitosamente.`);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al desactivar la asociación de la película');
    }
};

export const submitUserMovieForm = async (data: {
    id: number;
    watched: string;
    note: string;
    recommendationSource: string;
}): Promise<void> => {
    try {
        // Ruta pendiente por definir
        await api.put(`/users/usermovies/${data.id}`, {
            watched: data.watched,
            note: data.note,
            recommendationSource: data.recommendationSource,
        });
        console.log("Formulario enviado exitosamente:", data);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Error al enviar el formulario");
    }
};
