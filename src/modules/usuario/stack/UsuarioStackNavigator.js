import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HeaderBackButton from '../../../components/Button/HeaderBackButton';
import { colors } from '../../../components/Styles/ComumStyles';
import GerenciarUsuarios from '../screens/GerenciarUsuarios';
import UsuarioEdicaoForm from '../screens/UsuarioEdicaoForm';

const Stack = createNativeStackNavigator();

const UsuarioStackNavigator = () => {
  return (
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
        name="GerenciarUsuarios"
        component={GerenciarUsuarios}
      />
      <Stack.Screen name="UsuarioEdicaoForm" component={UsuarioEdicaoForm} />
    </Stack.Navigator>
  );
};

export default UsuarioStackNavigator;
