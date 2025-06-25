import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EsqueciMinhaSenhaForm from '../modules/usuario/screens/EsqueciMinhaSenhaForm';
import Login from '../modules/usuario/screens/Login';
import UsuarioCadastroForm from '../modules/usuario/screens/UsuarioCadastroForm';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="CadastroUsuario" component={UsuarioCadastroForm} />
    <Stack.Screen name="EsqueciMinhaSenha" component={EsqueciMinhaSenhaForm} />
  </Stack.Navigator>
);

export default AuthStack;
