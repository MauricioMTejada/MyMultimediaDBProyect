// frontend/src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import countriesReducer, { CountriesState } from './slices/countriesSlice';
import userMovieReducer, { UserMovieState } from './slices/userMovieSlice';
import authReducer, { AuthState } from './slices/authSlice';
import moviesReducer, { MoviesState } from './slices/moviesSlice';

// Definir la interfaz RootState
export interface RootState {
  countries: CountriesState;
  userMovie: UserMovieState;
  auth: AuthState;
  movies: MoviesState;
}

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    countries: countriesReducer,
    userMovie: userMovieReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
