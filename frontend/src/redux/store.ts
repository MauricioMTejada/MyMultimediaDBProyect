// frontend/src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import countriesReducer, { CountriesState } from './slices/countriesSlice'; // Importar CountriesState
import userMovieReducer, { UserMovieState } from './slices/userMovieSlice'; // Importar UserMovieState
import authReducer, { AuthState } from './slices/authSlice'; // Importar AuthState

// Definir la interfaz RootState
export interface RootState {
  countries: CountriesState;
  userMovie: UserMovieState;
  auth: AuthState;
}

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    userMovie: userMovieReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
