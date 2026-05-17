import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HeaderLeftBack from '../../../components/Button/HeaderLeftBack';
import { colors } from '../../../components/Styles/ComumStyles';
import ListTiposVariacoes from '../screens/ListTiposVariacoes';
import TipoVariacaoForm from '../screens/TipoVariacaoForm';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: colors.background,
  },
  headerShadowVisible: false,
  headerLeft: HeaderLeftBack,
};

const headerLeftHidden = () => null;

const TiposVariacoesStackNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      options={{ headerShown: false }}
      name="ListTiposVariacoes"
      component={ListTiposVariacoes}
    />
    <Stack.Screen
      name="TipoVariacaoForm"
      component={TipoVariacaoForm}
      options={{
        headerLeft: headerLeftHidden,
        headerBackVisible: false,
        gestureEnabled: false,
      }}
    />
  </Stack.Navigator>
);

export default TiposVariacoesStackNavigator;
