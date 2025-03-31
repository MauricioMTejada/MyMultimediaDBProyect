// frontend/src/redux/slices/authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { api } from '../../utils/apiConfig';

export const checkLoginStatus = createAsyncThunk(
    'auth/checkLoginStatus',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        if (!token) {
            return rejectWithValue('No hay token');
        }
        try {
            const response = await api.get('/auth/check');
            return { ...response.data, token };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Error al verificar el estado de inicio de sesión');
        }
    }
);

export interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    userId: number | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    token: null,
    userId: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<{ token: string; userId: number }>) => {
            // console.log('authSlice.ts - Login exitoso, token:', action.payload.token); // Verificar el token
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.loading = false;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isLoggedIn = false;
            state.token = null;
            state.userId = null;
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
            state.userId = null;
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
        },
        checkLoginStatusStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        checkLoginStatusSuccess: (state, action: PayloadAction<{ token: string | null, userId: number | null }>) => {
            state.isLoggedIn = action.payload.token !== null;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.loading = false;
            state.error = null;
        },
        registerStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state, action: PayloadAction<{ token: string; userId: number }>) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.loading = false;
            state.error = null;
        },
        registerFailure: (state, action: PayloadAction<string>) => {
            state.isLoggedIn = false;
            state.token = null;
            state.userId = null;
            state.loading = false;
            state.error = action.payload;
        },
        setUserId: (state, action: PayloadAction<number | null>) => {
            state.userId = action.payload;
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
        builder
            .addCase(checkLoginStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkLoginStatus.fulfilled, (state, action: PayloadAction<{ userId: number; token: string }>) => {
                console.log('authSlice.ts - Token recibido:', action.payload.token); // Verificar el token recibido
                state.isLoggedIn = true;
                state.userId = action.payload.userId;
                state.token = action.payload.token;
                state.loading = false;
                state.error = null;
            })
            .addCase(checkLoginStatus.rejected, (state, action: PayloadAction<any>) => {
                state.isLoggedIn = false;
                state.token = null;
                state.userId = null;
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
	loginStart,
	loginSuccess,
	loginFailure,
	logout,
	checkLoginStatusStart,
	checkLoginStatusSuccess,
	registerFailure,
	registerStart,
	registerSuccess,
	setUserId,
} = authSlice.actions;
export default authSlice.reducer;
