// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './slices/countriesSlice';
import movieAssociationReducer from './slices/movieAssociationSlice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    movieAssociation: movieAssociationReducer, // Agrega el reducer de movieAssociation
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {countries: CountriesState, movieAssociation: MovieAssociationState}
export type AppDispatch = typeof store.dispatch;
