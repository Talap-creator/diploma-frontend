// utils/axiosInstance.ts
import axios from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance with a base URL and credentials included for cross-site requests
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sea-lion-app-vsdn6.ondigitalocean.app',
  withCredentials: true, // This ensures cookies (such as CSRF token) are sent with requests
  headers: {
    'Content-Type': 'application/json',
  },
});


export default axiosInstance;
