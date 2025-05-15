import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import LoadingIndicator from '../components/Loading/LoadingIndicator';
import { AuthContext } from '../context/AuthProvider';
import AppStack from '../stack/AppStack';
import AuthStack from '../stack/AuthStack';
import style from './styles/style';

const MainNavigator = () => {
  const { token, loading, isValidToken, logout } = useContext(AuthContext);
  const tokenValido = token ? isValidToken(token) : false;

  useEffect(() => {
    if (token && !tokenValido) {
      logout();
    }
  }, [token, tokenValido, logout]);

  if (loading) {
    return (
      <View style={style.Loading}>
        <LoadingIndicator />
      </View>
    );
  }

  return tokenValido ? <AppStack /> : <AuthStack />;
};

export default MainNavigator;
