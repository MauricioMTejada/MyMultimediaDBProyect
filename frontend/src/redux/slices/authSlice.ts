// frontend/src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkLoginStatus } from '../../services/authService';

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
        checkLoginStatusSuccess: (state, action: PayloadAction<string | null>) => {
            state.isLoggedIn = action.payload !== null;
            state.token = action.payload;
            state.loading = false;
            state.error = null;
        },
        registerStart: (state) => { // Add registerStart
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state, action: PayloadAction<{ token: string; userId: number }>) => { // Add registerSuccess
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.loading = false;
            state.error = null;
        },
        registerFailure: (state, action: PayloadAction<string>) => { // Add registerFailure
            state.isLoggedIn = false;
            state.token = null;
            state.userId = null;
            state.loading = false;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkLoginStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkLoginStatus.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.userId = action.payload.userId;
                state.loading = false;
                state.error = null;
            })
            .addCase(checkLoginStatus.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.token = null;
                state.userId = null;
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, checkLoginStatusStart, checkLoginStatusSuccess, registerFailure, registerStart, registerSuccess } = // Export the new actions
    authSlice.actions;
export default authSlice.reducer;
