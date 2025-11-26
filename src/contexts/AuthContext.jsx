"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load token when app starts
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      decodeUsername(savedToken);
    }
    setIsHydrated(true);
  }, []);

  // Decode token → lấy username
  const decodeUsername = (jwtToken) => {
    try {
      const payload = JSON.parse(atob(jwtToken.split(".")[1]));
      setUsername(payload.sub); // backend bạn gán username vào "sub"
    } catch (err) {
      console.error("JWT decode lỗi:", err);
      setUsername(null);
    }
  };

  // Hàm đăng nhập
  const login = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    decodeUsername(jwtToken);
  };

  // Hàm đăng xuất
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        username,
        login,
        logout,
        isHydrated,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
