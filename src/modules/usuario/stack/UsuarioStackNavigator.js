import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HeaderLeftBack from '../../../components/Button/HeaderLeftBack';
import { colors } from '../../../components/Styles/ComumStyles';
import GerenciarUsuarios from '../screens/GerenciarUsuarios';
import UsuarioEdicaoForm from '../screens/UsuarioEdicaoForm';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: colors.background,
  },
  headerShadowVisible: false,
  headerLeft: HeaderLeftBack,
};

const UsuarioStackNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      options={{ headerShown: false }}
      name="GerenciarUsuarios"
      component={GerenciarUsuarios}
    />
    <Stack.Screen name="UsuarioEdicaoForm" component={UsuarioEdicaoForm} />
  </Stack.Navigator>
);

export default UsuarioStackNavigator;
