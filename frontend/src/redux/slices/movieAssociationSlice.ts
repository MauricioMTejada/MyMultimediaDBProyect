// src/redux/slices/movieAssociationSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../utils/apiConfig';

// Exportar la interfaz MovieAssociationState
export interface MovieAssociationState {
    associations: { [movieId: number]: boolean };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: MovieAssociationState = {
    associations: {},
    status: 'idle',
    error: null,
};

// Thunk para crear o eliminar la asociación
export const toggleMovieAssociation = createAsyncThunk(
    'movieAssociation/toggleMovieAssociation',
    async ({ userId, movieId, checked }: { userId: number; movieId: number; checked: boolean }, { rejectWithValue }) => {
        try {
            if (checked) {
                await api.post(`/users/${userId}/movies/${movieId}`, { userId, movieId });
            } else {
                await api.delete(`/users/${userId}/movies/${movieId}`);
            }
            return { movieId, checked };
        } catch (error: any) {
            return rejectWithValue(error.response?.data || `Error al ${checked ? 'asociar' : 'desasociar'} la película. Status: ${error.response?.status}`);
        }
    }
);

// Thunk para obtener las asociaciones iniciales
export const fetchInitialAssociations = createAsyncThunk(
    'movieAssociation/fetchInitialAssociations',
    async (userId: number, { rejectWithValue }) => {
        try {
            const response = await api.get(`/users/${userId}/movies`);
            const data = response.data;
            const initialAssociations: { [movieId: number]: boolean } = {};
            data.forEach((movie: any) => {
                initialAssociations[movie.movieId] = true;
            });
            return initialAssociations;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error al obtener las asociaciones iniciales');
        }
    }
);

const movieAssociationSlice = createSlice({
    name: 'movieAssociation',
    initialState,
    reducers: {
        setAssociation: (state, action: PayloadAction<{ movieId: number; checked: boolean }>) => {
            const { movieId, checked } = action.payload;
            state.associations[movieId] = checked;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(toggleMovieAssociation.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(toggleMovieAssociation.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.associations[action.payload.movieId] = action.payload.checked;
            })
            .addCase(toggleMovieAssociation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Error al actualizar la asociación';
            })
            .addCase(fetchInitialAssociations.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchInitialAssociations.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.associations = action.payload;
            })
            .addCase(fetchInitialAssociations.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Error al obtener las asociaciones iniciales';
            });
    },
});

export const { setAssociation } = movieAssociationSlice.actions;
export default movieAssociationSlice.reducer;
