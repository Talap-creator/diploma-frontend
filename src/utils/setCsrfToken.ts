// utils/setCsrfToken.ts
import Cookies from 'js-cookie';

interface CsrfTokenResponse {
  csrfToken: string;
}

export const setCsrfToken = async (): Promise<void> => {
  try {
    const response = await fetch('https://sea-lion-app-vsdn6.ondigitalocean.app/ecoMarket/csrf/');
    const data: CsrfTokenResponse = await response.json();
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
  }
};
