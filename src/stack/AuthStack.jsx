import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HeaderBackButton from '../components/Button/HeaderBackButton';
import { colors } from '../components/Styles/ComumStyles';
import EsqueciMinhaSenhaForm from '../modules/usuario/screens/EsqueciMinhaSenhaForm';
import Login from '../modules/usuario/screens/Login';
import UsuarioCadastroForm from '../modules/usuario/screens/UsuarioCadastroForm';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={({ navigation }) => ({
      headerShown: true,
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerShadowVisible: false,
      headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
    })}
  >
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
