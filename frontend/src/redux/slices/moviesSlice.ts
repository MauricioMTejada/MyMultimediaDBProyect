import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovies } from '../../services/movieService';
import { Movie } from '../../types/types';
import { RootState } from '../store';

export interface MoviesState {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  isLoading: false,
  error: null,
};

// Thunk para obtener las películas
export const fetchMoviesThunk = createAsyncThunk(
    'movies/fetchMovies',
    async (_, { getState, rejectWithValue }) => {
      try {
        const state = getState() as RootState; // Obtén el estado global
        const movieIdsOfUser = state.userMovie.movieIdsOfUser; // Accede a movieIdsOfUser desde el estado

        const moviesData = await fetchMovies();
        return moviesData.map(({ id, ...rest }) => ({
          ...rest, // Incluye todas las demás propiedades del objeto
          movieId: id, // Renombra "id" a "movieId"
          isAssociated: movieIdsOfUser.includes(id), // Agrega la propiedad "isAssociated"
        }));
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || err.message || 'Ocurrió un error desconocido.');
      }
    }
  );

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMoviesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMoviesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default moviesSlice.reducer;