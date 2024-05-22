// hooks/useVerifyAndRefreshToken.ts
import { useEffect } from 'react';
import { getToken, getRefreshToken, isTokenExpired, refreshAccessToken, clearTokens } from '../utils/authUtils';

export const useVerifyAndRefreshToken = () => {
  useEffect(() => {
    const verifyAndRefreshToken = async () => {
      const token = getToken();
      const refreshToken = getRefreshToken();

      if (!token || !refreshToken) {
        clearTokens();
        // Optionally redirect to login or display a message
        console.log('No tokens available. Please log in.');
        return;
      }

      if (isTokenExpired(token)) {
        try {
          await refreshAccessToken(refreshToken);
          console.log('Token refreshed successfully.');
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log('Token is valid.');
        console.log('Token:', token);
      }
    };

    verifyAndRefreshToken();
  }, []);
};
