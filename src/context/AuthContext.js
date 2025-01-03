import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decoded = jwtDecode(storedToken);
      setRole(decoded.role);
      setToken(storedToken);
    }
  }, []);

  const login = (token) => {
    const decoded = jwtDecode(token);
    setRole(decoded.role);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setRole(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ role, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
