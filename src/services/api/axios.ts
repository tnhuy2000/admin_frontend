import axios from 'axios';
import { NAVIGATION_ROUTES } from '@/constants/routes';
import { tokenService } from './token.service';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4001';
const BASE_PATH = import.meta.env.VITE_APP_BASENAME_PATH || '/';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthEndpoint =
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/register') ||
      originalRequest.url?.includes('/auth/refresh');

    if (isAuthEndpoint) return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await tokenService.refresh();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      }

      // Refresh fail → redirect
      window.location.href = `${BASE_PATH}${NAVIGATION_ROUTES.LOGIN}`.replace('//', '/');
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
