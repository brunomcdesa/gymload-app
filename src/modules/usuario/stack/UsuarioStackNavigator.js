import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import GerenciarUsuarios from '../screens/GerenciarUsuarios';
import UsuarioEdicaoForm from '../screens/UsuarioEdicaoForm';

const Stack = createNativeStackNavigator();

const UsuarioStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GerenciarUsuarios" component={GerenciarUsuarios} />
      <Stack.Screen name="UsuarioEdicaoForm" component={UsuarioEdicaoForm} />
    </Stack.Navigator>
  );
};

export default UsuarioStackNavigator;
