// frontend/src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Exportar la interfaz AuthState
export interface AuthState {
    isLoggedIn: boolean;
    userId: number | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
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
        loginSuccess: (state, action: PayloadAction<number>) => {
            state.isLoggedIn = true;
            state.userId = action.payload;
            state.loading = false;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isLoggedIn = false;
            state.userId = null;
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userId = null;
            state.loading = false;
            state.error = null;
        },
        //para cuando se inicie la app y se quiera saber si ya estaba logueado
        checkLoginStatusStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        checkLoginStatusSuccess: (state, action: PayloadAction<number | null>) => {
            state.isLoggedIn = action.payload !== null;
            state.userId = action.payload;
            state.loading = false;
        },
        checkLoginStatusFailure: (state, action: PayloadAction<string>) => {
            state.isLoggedIn = false;
            state.userId = null;
            state.loading = false;
            state.error = action.payload;
        },
        // Nuevas acciones para el registro
        registerStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },
        registerFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    checkLoginStatusStart,
    checkLoginStatusSuccess,
    checkLoginStatusFailure,
    // Exportar las nuevas acciones
    registerStart,
    registerSuccess,
    registerFailure,
} = authSlice.actions;

export default authSlice.reducer;
