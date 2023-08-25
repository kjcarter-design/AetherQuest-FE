import { createContext, useContext, useState } from 'react';
import { useAuth } from '../hooks/useAuth'; // Import the useAuth hook

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = useAuth(); // Use the useAuth hook

  const login = async (formData) => {
    const response = await auth.login(formData);
    setUser(response.data);
  };

  const logout = () => {
    auth.logout();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
