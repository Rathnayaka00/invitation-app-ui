import axios from 'axios';

// Railway backend URL - replace with your actual Railway deployment URL
export const API_BASE_URL = 'https://invitation-app-backend-production.up.railway.app';

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses by clearing token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      // Optionally redirect to login or show error message
    }
    return Promise.reject(error);
  }
);
