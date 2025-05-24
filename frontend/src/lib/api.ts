import axios from 'axios';
import { storage } from './utils';

export interface AuthResponse {
  user: User;
  jwt: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export async function handleApiResponse(response: any) {
  // Axios automatically handles JSON response parsing
  if (response.status >= 200 && response.status < 300) {
    return response.data; // response.data contains the parsed data
  } else {
    console.error(JSON.stringify(response.data, null, 2));
    return Promise.reject(response.data);
  }
}

export function getUserProfile(): Promise<{ user: User | undefined }> {
  return axios({
    url: '/customer-auth/profile',
    method: 'GET',
  }).then(handleApiResponse);
}

export function loginWithEmailAndPassword(
  data: unknown,
): Promise<AuthResponse> {
  return axios({
    url: '/customer-auth/login',
    method: 'POST',
    data, // Axios will automatically stringify the object
  }).then(handleApiResponse);
}

export function registerWithEmailAndPassword(
  data: unknown,
): Promise<AuthResponse> {
  return axios({
    url: '/customer-auth/register',
    method: 'POST',
    data, // Axios will automatically stringify the object
  }).then(handleApiResponse);
}

export function refreshToken(refreshToken: string): Promise<AuthResponse> {
  return axios({
    url: '/customer-auth/refresh',
    method: 'POST',
    data: { refreshToken },
  }).then(handleApiResponse);
}

export function logout(): void {
  return storage.clearToken();
}
