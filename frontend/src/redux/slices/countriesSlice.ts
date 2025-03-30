// src/slices/countriesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Country } from '../../types/types'; //Importamos la interface de types
import { api } from '../../utils/apiConfig';//Importamos la constante

// Exportar la interfaz CountriesState
export interface CountriesState {
  data: Country[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CountriesState = {
  data: [],
  status: 'idle',
  error: null,
};

// Creamos un thunk para obtener los paises de la API
export const fetchCountries = createAsyncThunk<Country[], void>(
  'countries/fetchCountries',
  async () => {
    try {
      const response = await api.get<Country[]>('/countries'); // Use api.get with type
      return response.data; // Return the data from the response
    } catch (error: any) {
      // Handle errors properly
      throw new Error(error.response?.data?.message || 'Error al obtener los países');
    }
  }
);

// Creamos el slice
const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error al obtener los países';
      });
  },
});

export default countriesSlice.reducer;
