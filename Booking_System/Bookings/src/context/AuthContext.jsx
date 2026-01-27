import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const token = localStorage.getItem("token");
  const currentUser = localStorage.getItem("currentUser");

  if (token && currentUser) {
    try {
      setUser(JSON.parse(currentUser));
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
    }
  } else {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
  }

  setIsLoading(false);
}, []);


  const login = (userData) => {
  setUser(userData);
  localStorage.setItem("currentUser", JSON.stringify(userData));

  if (userData.token) {
    localStorage.setItem("token", userData.token);
  }
};


  const logout = () => {
  setUser(null);
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token"); //  IMPORTANT
};

  // const isAuthenticated = () => {
  //   return user !== null;
  // };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user, 
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

