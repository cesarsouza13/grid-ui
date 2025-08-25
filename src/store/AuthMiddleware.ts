// src/store/authMiddleware.ts

import Cookies from 'js-cookie';

import type { Middleware } from '@reduxjs/toolkit';
import { setLogin, setLogout } from './AuthSlice';

export const authMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (setLogout.match(action)) {
    Cookies.remove('token');
  }

  return result;
};
