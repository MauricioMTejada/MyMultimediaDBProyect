// frontend/src/redux/slices/userMovieSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserMovies } from '../../services/userMovieService'; // Importa el servicio
import { CombinedMovieData } from '../../types/types';

// Exportar la interfaz UserMovieState
export interface UserMovieState {
    userMovies: CombinedMovieData[];
    loading: boolean;
    error: string | null;
    movieIdsOfUser: number[]; // Nuevo estado para guardar los movieIds
}

const initialState: UserMovieState = {
    userMovies: [],
    loading: false,
    error: null,
    movieIdsOfUser: [], // Inicializar el array de movieIds
};

// Acción asíncrona para cargar las películas del usuario
export const loadUserMovies = createAsyncThunk(
    'userMovie/loadUserMovies',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchUserMovies(); // Llama al servicio
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Error al cargar las películas del usuario');
        }
    }
);

const userMovieSlice = createSlice({
    name: 'userMovie',
    initialState,
    reducers: {
        /* setWatchedStatusStart: (state) => {
            state.loading = true;
            state.error = null;
        },
         setWatchedStatusSuccess: (state, action: PayloadAction<{ userMovieId: number; watched: string }>) => {
            state.watchedStatus[action.payload.userMovieId] = action.payload.watched;
            state.loading = false;
        },
        setWatchedStatusFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        setInitialWatchedStatus: (state, action: PayloadAction<{ [userMovieId: number]: string }>) => {
            state.watchedStatus = action.payload;
        }, */

        // cuando se asocia una película, se agrega al estado la película sin tener que realizar una nueva solicitud al backend
        addAssociateUserMovie: (state, action: PayloadAction<CombinedMovieData>) => {
            console.log({state});
            console.log(`Película con ID ${action.payload} asociada exitosamente.`);
            console.log(action.payload); // Imprimir la película asociada para depuración
            // state.userMovies = [...state.userMovies, action.payload]; // Usar spread operator para agregar la nueva película
            // state.movieIdsOfUser = [...state.movieIdsOfUser, action.payload.movieId]; // Usar spread operator para agregar el movieId
            return {
                ...state,
                userMovies: [...state.userMovies, action.payload],
                movieIdsOfUser: [...state.movieIdsOfUser, action.payload.movieId]
            };
        },

        // cuando se elimina la asociación de una película, se elimina del estado sin tener que realizar una nueva solicitud al backend
        removeAssociateUserMovie: (state, action: PayloadAction<number>) => {
            // const movieId = action.payload;
            // state.userMovies = state.userMovies.filter((movie) => movie.movieId !== movieId); // Eliminar la película del estado
            // state.movieIdsOfUser = state.movieIdsOfUser.filter((id) => id !== movieId); // Eliminar el movieId del array
            return {
                ...state,
                userMovies: state.userMovies.filter((movie) => movie.movieId !== action.payload),
                movieIdsOfUser: state.movieIdsOfUser.filter((id) => id !== action.payload),
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUserMovies.pending, (state) => {
                // state.loading = true;
                // state.error = null;
                return {
                    ...state,
                    loading: true,
                    error: null,
                };
            })
            .addCase(loadUserMovies.fulfilled, (state, action: PayloadAction<CombinedMovieData[]>) => {
                // state.loading = false;
                // state.userMovies = action.payload;

                // Extract movie IDs and update the state
                // state.movieIdsOfUser = action.payload.map((movie) => movie.movieId); // Extraer los movieIds y guardarlos en el estado
                return {
                    ...state,
                    loading: false,
                    userMovies: action.payload,
                    movieIdsOfUser: action.payload.map((movie) => movie.movieId), // Extraer los movieIds y guardarlos en el estado
                };
            })
            .addCase(loadUserMovies.rejected, (state, action: PayloadAction<any>) => {
                // state.loading = false;
                // state.error = action.payload;
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                };
            });
    },
});

export const {
    addAssociateUserMovie,
    removeAssociateUserMovie,
} = userMovieSlice.actions;
export default userMovieSlice.reducer;
