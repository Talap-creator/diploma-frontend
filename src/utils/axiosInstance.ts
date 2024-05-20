import axios from 'axios';
import { getCsrfToken } from './getCsrfToken';


// Define a base URL using environment variables
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sea-lion-app-vsdn6.ondigitalocean.app';

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCsrfToken() || '',  // Ensures a string is passed; update as needed for handling undefined
  }
});



export default axiosInstance;