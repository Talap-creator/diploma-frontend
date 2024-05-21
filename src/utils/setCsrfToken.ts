// utils/setCsrfToken.ts
import Cookies from 'js-cookie';

interface CsrfTokenResponse {
  csrfToken: string;
}

export const setCsrfToken = async (): Promise<void> => {
  try {
    const response = await fetch('http://localhost:8000/ecoMarket/csrf/');
    const data: CsrfTokenResponse = await response.json();
    Cookies.set('csrftoken', data.csrfToken, { path: '/' });
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
  }
};
