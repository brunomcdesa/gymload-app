import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import UsuarioCadastroForm from '../modules/usuario/cadastro/UsuarioCadastroForm';
import Login from '../modules/usuario/login/Login';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="CadastroUsuario" component={UsuarioCadastroForm} />
  </Stack.Navigator>
);

export default AuthStack;
