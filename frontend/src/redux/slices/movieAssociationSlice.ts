// src/redux/slices/movieAssociationSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../utils/apiConfig';

interface MovieAssociationState {
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
    async ({ userId, movieId, checked }: { userId: number; movieId: number; checked: boolean }) => {
        const method = checked ? 'POST' : 'DELETE';
        const url = `${API_BASE_URL}/users/${userId}/movies/${movieId}`;
        const headers = {
            'Content-Type': 'application/json',
        };
        const body = checked ? JSON.stringify({ userId, movieId }) : undefined;

        const response = await fetch(url, {
            method,
            headers,
            body,
        });

        if (!response.ok) {
            throw new Error(`Error al ${checked ? 'asociar' : 'desasociar'} la película. Status: ${response.status}`);
        }

        return { movieId, checked };
    }
);

// Thunk para obtener las asociaciones iniciales
export const fetchInitialAssociations = createAsyncThunk(
    'movieAssociation/fetchInitialAssociations',
    async (userId: number) => {
        const response = await fetch(`${API_BASE_URL}/users/${userId}/movies`);
        if (!response.ok) {
            throw new Error('Error al obtener las asociaciones iniciales');
        }
        const data = await response.json();
        const initialAssociations: { [movieId: number]: boolean } = {};
        data.forEach((movie: any) => {
            initialAssociations[movie.movieId] = true;
        });
        return initialAssociations;
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
                state.error = action.error.message || 'Error al actualizar la asociación';
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
                state.error = action.error.message || 'Error al obtener las asociaciones iniciales';
            });
    },
});

export const { setAssociation } = movieAssociationSlice.actions;
export default movieAssociationSlice.reducer;
