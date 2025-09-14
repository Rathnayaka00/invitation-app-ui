import { api } from '../config/api';

export interface AdminLogin {
  passcode: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

// Admin login
export const adminLogin = async (passcode: string): Promise<TokenResponse> => {
  const response = await api.post<TokenResponse>('/admin/login', { passcode });
  return response.data;
};

// Save token to localStorage
export const saveToken = (token: string): void => {
  localStorage.setItem('admin_token', token);
};

// Get token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem('admin_token');
};

// Remove token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem('admin_token');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};
