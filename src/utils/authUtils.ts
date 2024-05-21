// utils/authUtils.ts
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  exp: number;
}

const getFromStorage = (key: string): string | null => localStorage.getItem(key);
const setToStorage = (key: string, value: string) => localStorage.setItem(key, value);
const removeFromStorage = (key: string) => localStorage.removeItem(key);

export const getToken = (): string | null => getFromStorage('accessToken');
export const getRefreshToken = (): string | null => getFromStorage('refreshToken');
export const setToken = (token: string) => setToStorage('accessToken', token);
export const setRefreshToken = (token: string) => setToStorage('refreshToken', token);

export const clearTokens = () => {
  removeFromStorage('accessToken');
  removeFromStorage('refreshToken');
};

export const logout = () => {
  clearTokens();  // Clear all tokens

  // Optionally redirect to the login page or home page
  // If using Next.js routing, you might want to use Router from 'next/router'
  if (typeof window !== 'undefined') {
    window.location.href = '/sign-in'; // Redirects to login after clearing the tokens
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
  return decoded.exp * 1000 < Date.now();
};

export const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  try {
    const response = await axios.post('http://localhost:8000/api/token/refresh/', {
      refresh: refreshToken
    });
    setToken(response.data.access);  // Update the access token in storage
    return response.data.access;
  } catch (error) {
    clearTokens();  // Clear tokens if refresh failed
    throw new Error('Session expired. Please log in again.');
  }
};
