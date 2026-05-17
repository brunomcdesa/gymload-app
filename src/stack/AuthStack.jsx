import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HeaderLeftBack from '../components/Button/HeaderLeftBack';
import { colors } from '../components/Styles/ComumStyles';
import EsqueciMinhaSenhaForm from '../modules/usuario/screens/EsqueciMinhaSenhaForm';
import Login from '../modules/usuario/screens/Login';
import UsuarioCadastroForm from '../modules/usuario/screens/UsuarioCadastroForm';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: colors.background,
  },
  headerShadowVisible: false,
  headerLeft: HeaderLeftBack,
};

const AuthStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      options={{ headerShown: false }}
      name="Login"
      component={Login}
    />
    <Stack.Screen name="CadastroUsuario" component={UsuarioCadastroForm} />
    <Stack.Screen
      options={{ headerTitle: '' }}
      name="EsqueciMinhaSenha"
      component={EsqueciMinhaSenhaForm}
    />
  </Stack.Navigator>
);

export default AuthStack;
