// utils/axiosInstance.ts
import axios from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance with a base URL and credentials included for cross-site requests
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sea-lion-app-vsdn6.ondigitalocean.app/',
  withCredentials: true, // This ensures cookies (such as CSRF token) are sent with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the CSRF token in the headers of each request
axiosInstance.interceptors.request.use(config => {
  const csrfToken = Cookies.get('csrftoken'); // Get the CSRF token from cookies
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken; // Set CSRF token in the request header
    console.log('CSRF token added to request headers:', csrfToken);
  } else {
    console.warn('CSRF token not found in cookies'); // Log a warning if the CSRF token is not found
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;
