import React, { useContext } from 'react';
import { View } from 'react-native';
import LoadingIndicator from '../components/Loading/LoadingIndicator';
import { AuthContext } from '../context/AuthProvider';
import AppStack from '../stack/AppStack';
import AuthStack from '../stack/AuthStack';
import style from './styles/style';

const MainNavigator = () => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={style.Loading}>
        <LoadingIndicator />
      </View>
    );
  }
  return token ? <AppStack /> : <AuthStack />;
};

export default MainNavigator;
