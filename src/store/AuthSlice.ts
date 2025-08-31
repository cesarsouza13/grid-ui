// src/store/authSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export type UserAuth = {
  id: string;
  name: string;
};

interface AuthState {
  isAuthenticated: boolean;
  user: UserAuth | null;
  
}

const initialState: AuthState = {
  isAuthenticated: !!Cookies.get('token'),
  user: Cookies.get('token') ? JSON.parse(localStorage.getItem('grid_user') || 'null') : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<{ user: UserAuth}>) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        localStorage.setItem('grid_user', JSON.stringify(action.payload.user));
      },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      Cookies.remove('token'); 
    },
    setUser: (state, action: PayloadAction<UserAuth>) => {
      state.user = action.payload;
    },
  },
});

export const { setLogin, setLogout, setUser } = authSlice.actions;
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export default authSlice.reducer;
