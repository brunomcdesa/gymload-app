import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import HeaderBackButton from '../../../components/Button/HeaderBackButton';
import { colors } from '../../../components/Styles/ComumStyles';
import Perfil from '../../usuario/screens/Perfil';
import UsuarioCadastroForm from '../../usuario/screens/UsuarioCadastroForm';
import UsuarioStackNavigator from '../../usuario/stack/UsuarioStackNavigator';
import Dashboard from '../screens/Dashboard';

const Stack = createStackNavigator();

const DashboardStackNavigator = () => {
  const navigateToDashboardScreen = (navigation) => {
    navigation.navigate('DashboardScreen');
  };

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
          height: 40,
        },
        headerShadowVisible: false,
        headerLeft: () => (
          <HeaderBackButton
            onPress={() => navigateToDashboardScreen(navigation)}
          />
        ),
      })}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="DashboardScreen"
        component={Dashboard}
      />
      <Stack.Screen
        options={{ headerTitle: '' }}
        name="Perfil"
        component={Perfil}
      />
      <Stack.Screen
        options={{ headerTitle: '' }}
        name="GerenciarUsuariosStack"
        component={UsuarioStackNavigator}
      />
      <Stack.Screen
        options={{ headerTitle: '' }}
        name="UsuarioCadastroForm"
        component={UsuarioCadastroForm}
      />
    </Stack.Navigator>
  );
};

export default DashboardStackNavigator;
