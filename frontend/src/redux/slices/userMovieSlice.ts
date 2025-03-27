// frontend/src/redux/slices/userMovieSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Exportar la interfaz UserMovieState
export interface UserMovieState {
  watchedStatus: { [userMovieId: number]: string }; // { userMovieId: 'Sí' | 'No' | 'Viendo' }
  loading: boolean;
  error: string | null;
}

const initialState: UserMovieState = {
  watchedStatus: {},
  loading: false,
  error: null,
};

const userMovieSlice = createSlice({
  name: 'userMovie',
  initialState,
  reducers: {
    setWatchedStatusStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setWatchedStatusSuccess: (state, action: PayloadAction<{ userMovieId: number; watched: string }>) => {
      state.watchedStatus[action.payload.userMovieId] = action.payload.watched;
      state.loading = false;
    },
    setWatchedStatusFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setInitialWatchedStatus: (state, action: PayloadAction<{ [userMovieId: number]: string }>) => {
      state.watchedStatus = action.payload;
    },
  },
});

export const { setWatchedStatusStart, setWatchedStatusSuccess, setWatchedStatusFailure, setInitialWatchedStatus } = userMovieSlice.actions;
export default userMovieSlice.reducer;
