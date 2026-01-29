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
  const token = sessionStorage.getItem("token");
  const currentUser = sessionStorage.getItem("currentUser");

  if (token && currentUser) {
    try {
      setUser(JSON.parse(currentUser));
    } catch (error) {
      console.error("Error parsing user data:", error);
      sessionStorage.removeItem("currentUser");
      sessionStorage.removeItem("token");
      setUser(null);
    }
  } else {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("token");
    setUser(null);
  }

  setIsLoading(false);
}, []);


  const login = (userData) => {
  setUser(userData);
  sessionStorage.setItem("currentUser", JSON.stringify(userData));

  if (userData.token) {
    sessionStorage.setItem("token", userData.token);
  }
};


  const logout = () => {
  setUser(null);
  sessionStorage.removeItem("currentUser");
  sessionStorage.removeItem("token");
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

