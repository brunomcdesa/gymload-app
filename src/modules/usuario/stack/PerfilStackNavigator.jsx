import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HeaderBackButton from '../../../components/Button/HeaderBackButton';
import { colors } from '../../../components/Styles/ComumStyles';
import GruposMuscularesStackNavigator from '../../gruposMusculares/stack/GruposMuscularesStackNavigator';
import TiposVariacoesStackNavigator from '../../tipovariacao/stack/TiposVariacoesStackNavigator';
import AjudaSuporte from '../screens/AjudaSuporte';
import AlterarSenhaForm from '../screens/AlterarSenhaForm';
import EditarPerfilForm from '../screens/EditarPerfilForm';
import Notificacoes from '../screens/Notificacoes';
import Perfil from '../screens/Perfil';
import UsuarioCadastroForm from '../screens/UsuarioCadastroForm';
import UsuarioStackNavigator from './UsuarioStackNavigator';

const Stack = createStackNavigator();

const HeaderLeftToPerfil = () => {
  const navigation = useNavigation();
  return (
    <HeaderBackButton onPress={() => navigation.navigate('PerfilScreen')} />
  );
};

const screenOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: colors.background,
    height: 40,
  },
  headerShadowVisible: false,
  headerLeft: HeaderLeftToPerfil,
};

const PerfilStackNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
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
      options={{ headerTitle: '', headerShown: false }}
      name="TiposVariacoesStack"
      component={TiposVariacoesStackNavigator}
    />
    <Stack.Screen
      options={{ headerTitle: '', headerShown: false }}
      name="GruposMuscularesStack"
      component={GruposMuscularesStackNavigator}
    />
    <Stack.Screen
      options={{ headerTitle: '' }}
      name="UsuarioCadastroForm"
      component={UsuarioCadastroForm}
    />
  </Stack.Navigator>
);

export default PerfilStackNavigator;
