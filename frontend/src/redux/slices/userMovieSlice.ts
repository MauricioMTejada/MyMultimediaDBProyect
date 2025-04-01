// frontend/src/redux/slices/userMovieSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserMovies } from '../../services/userMovieService'; // Importa el servicio
import { CombinedMovieData } from '../../types/types';

// Exportar la interfaz UserMovieState
export interface UserMovieState {
    userMovies: CombinedMovieData[];
    watchedStatus: { [userMovieId: number]: string }; // { userMovieId: 'Sí' | 'No' | 'Viendo' }
    loading: boolean;
    error: string | null;
    movieIdsOfUser: number[]; // Nuevo estado para guardar los movieIds
}

const initialState: UserMovieState = {
    userMovies: [],
    watchedStatus: {},
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
        setWatchedStatusStart: (state) => {
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
        },
        addAssociateUserMovie: (state, action: PayloadAction<CombinedMovieData>) => {
            state.userMovies.push(action.payload); // Agregar la nueva película al estado
            state.movieIdsOfUser.push(action.payload.movieId); // Agregar el movieId al array
        },
        removeAssociateUserMovie: (state, action: PayloadAction<number>) => {
            const movieId = action.payload;
            state.userMovies = state.userMovies.filter((movie) => movie.movieId !== movieId); // Eliminar la película del estado
            state.movieIdsOfUser = state.movieIdsOfUser.filter((id) => id !== movieId); // Eliminar el movieId del array
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUserMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadUserMovies.fulfilled, (state, action: PayloadAction<CombinedMovieData[]>) => {
                state.loading = false;
                state.userMovies = action.payload;
                // Inicializar watchedStatus basado en los datos recibidos
                action.payload.forEach((movie) => {
                    state.watchedStatus[movie.userMovieId] = movie.watched;
                });
                // Extract movie IDs and update the state
                state.movieIdsOfUser = action.payload.map((movie) => movie.movieId); // Extraer los movieIds y guardarlos en el estado
            })
            .addCase(loadUserMovies.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    setWatchedStatusStart,
    setWatchedStatusSuccess,
    setWatchedStatusFailure,
    setInitialWatchedStatus,
    addAssociateUserMovie,
    removeAssociateUserMovie,
} = userMovieSlice.actions;
export default userMovieSlice.reducer;
