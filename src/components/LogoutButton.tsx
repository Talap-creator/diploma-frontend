// components/LogoutButton.tsx
import React from 'react';
import { logout } from '../utils/authUtils';

const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    logout();  // Calls the logout function that clears the tokens and redirects
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
