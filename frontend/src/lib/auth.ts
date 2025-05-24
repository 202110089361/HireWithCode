import { configureAuth } from 'react-query-auth';
import {
  getUserProfile,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  AuthResponse,
  logout,
} from './api';
import { storage } from './utils';

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
  name: string;
  password: string;
  verificationCode: string;
};

async function handleUserResponse(data: AuthResponse) {
  const { jwt, user, refreshToken } = data;
  storage.setToken(jwt);
  storage.setRefreshToken(refreshToken);
  console.log('Token saved:', storage.getToken());
  return user;
}

async function userFn() {
  const response = await getUserProfile();
  return response.user ?? null;
}

async function loginFn(data: LoginCredentials) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: RegisterCredentials) {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  await logout();
}

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
  configureAuth({
    userFn,
    loginFn,
    registerFn,
    logoutFn,
  });
