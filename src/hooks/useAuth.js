import { useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (formData) => {
    // Call your API to authenticate
    // If successful:
    setIsAuthenticated(true);
    return { data: { name: 'John Doe', email: formData.email } }; // Sample response
  };

  const logout = () => {
    // Call your API to logout or clear tokens
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};
