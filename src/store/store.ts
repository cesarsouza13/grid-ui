// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import { authMiddleware } from './AuthMiddleware.ts';


export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;