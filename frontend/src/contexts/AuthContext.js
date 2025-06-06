import React, { createContext, useState, useEffect } from 'react';
import { isAuthenticated, logout } from '../utils/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on initial load
    if (isAuthenticated()) {
      // You could fetch user details here if needed
      setUser({ isAuthenticated: true });
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
