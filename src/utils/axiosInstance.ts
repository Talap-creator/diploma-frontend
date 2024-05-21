// utils/axiosInstance.ts
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sea-lion-app-vsdn6.ondigitalocean.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const csrfToken = Cookies.get('csrftoken');
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
    console.log('CSRF token added to request headers:', csrfToken);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
