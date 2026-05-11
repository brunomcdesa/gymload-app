import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HeaderBackButton from '../../../components/Button/HeaderBackButton';
import { colors } from '../../../components/Styles/ComumStyles';
import AjudaSuporte from '../screens/AjudaSuporte';
import AlterarSenhaForm from '../screens/AlterarSenhaForm';
import EditarPerfilForm from '../screens/EditarPerfilForm';
import Notificacoes from '../screens/Notificacoes';
import Perfil from '../screens/Perfil';
import UsuarioCadastroForm from '../screens/UsuarioCadastroForm';
import UsuarioStackNavigator from './UsuarioStackNavigator';

const Stack = createStackNavigator();

const PerfilStackNavigator = () => {
  const navigateToPerfilScreen = (navigation) => {
    navigation.navigate('PerfilScreen');
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
            onPress={() => navigateToPerfilScreen(navigation)}
          />
        ),
      })}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="PerfilScreen"
        component={Perfil}
      />
      <Stack.Screen
        options={{ headerTitle: '' }}
        name="EditarPerfilForm"
        component={EditarPerfilForm}
      />
      <Stack.Screen
        options={{ headerTitle: '' }}
        name="AlterarSenhaForm"
        component={AlterarSenhaForm}
      />
      <Stack.Screen
        options={{ headerTitle: '' }}
        name="Notificacoes"
        component={Notificacoes}
      />
      <Stack.Screen
        options={{ headerTitle: '' }}
        name="AjudaSuporte"
        component={AjudaSuporte}
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

export default PerfilStackNavigator;
