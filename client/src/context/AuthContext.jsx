import React, { createContext, useContext, useState, useEffect } from 'react';
import client from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken) {
      setToken(savedToken);
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          setUser(null);
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await client.post('/api/auth/login', { email, password });
      const authToken = res.data?.token || res.data?.access_token;
      if (authToken) {
        localStorage.setItem('token', authToken);
        setToken(authToken);
      }
      const userData = res.data?.user || { email, fullName: res.data?.fullName || email.split('@')[0], department: res.data?.department || 'Engineering' };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true, data: res.data };
    } catch (err) {
      // In hackathon dev mode if Member 3 API is not running yet, we can provide a graceful offline fallback if needed, or bubble error
      throw err;
    }
  };

  const register = async ({ email, password, fullName, department }) => {
    try {
      const res = await client.post('/api/auth/register', { email, password, fullName, department });
      const authToken = res.data?.token || res.data?.access_token;
      if (authToken) {
        localStorage.setItem('token', authToken);
        setToken(authToken);
      }
      const userData = res.data?.user || { email, fullName, department };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true, data: res.data };
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, loading, login, register, logout, setToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
