import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstanceWithAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sea-lion-app-vsdn6.ondigitalocean.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstanceWithAuth.interceptors.request.use((config) => {
  // Check if running in the browser (client-side)
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
  }

  const csrfToken = Cookies.get('csrftoken');
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
    console.log('CSRF token added to request headers:', csrfToken);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstanceWithAuth;
