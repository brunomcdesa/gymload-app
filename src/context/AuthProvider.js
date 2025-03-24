import * as SecureStore from 'expo-secure-store';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadToken = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync('userToken');

      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
      console.log('Erro ao carregar token:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

  const login = async (jwtToken) => {
    await SecureStore.setItemAsync('userToken', jwtToken);
    setToken(jwtToken);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
