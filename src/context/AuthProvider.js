import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';
import React, { createContext, useCallback, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({
    nome: null,
    roles: [],
  });
  const [loading, setLoading] = useState(true);

  const loadToken = useCallback(async () => {
    try {
      const storedToken = await SecureStore.getItemAsync('userToken');

      if (storedToken) {
        setToken(storedToken);
        decodeToken(storedToken);
      }
    } catch (error) {
      console.log('Erro ao carregar token:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const decodeToken = (jwtToken) => {
    try {
      const tokenDecoded = jwtDecode(jwtToken);
      setUser({
        nome: tokenDecoded.usuarioNome || null,
        roles: tokenDecoded.usuarioRoles || [],
      });
    } catch (error) {
      console.log('Erro ao decodificar token:', error);
      setUser({ nome: null, roles: [] });
    }
  };

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  const login = async (jwtToken) => {
    await SecureStore.setItemAsync('userToken', jwtToken);
    setToken(jwtToken);
    decodeToken(jwtToken);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setToken(null);
    setUser({ nome: null, roles: [] });
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
