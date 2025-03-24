import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext } from '../context/AuthProvider';
import AppStack from '../stack/AppStack';
import AuthStack from '../stack/AuthStack';
import style from './styles/style';

const MainNavigator = () => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={style.Loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return token ? <AppStack /> : <AuthStack />;
};

export default MainNavigator;
