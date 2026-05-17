import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import HeaderBackButton from '../../../components/Button/HeaderBackButton';
import { colors } from '../../../components/Styles/ComumStyles';
import RegistroAtividadeForm from '../../registrosAtividades/screens/RegistroAtividadeForm';
import RegistroAtividadesCompleto from '../../registrosAtividades/screens/RegistroAtividadesCompleto';
import Dashboard from '../screens/Dashboard';

const Stack = createStackNavigator();

const HeaderLeftToDashboard = () => {
  const navigation = useNavigation();
  return (
    <HeaderBackButton onPress={() => navigation.navigate('DashboardScreen')} />
  );
};

const screenOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: colors.background,
    height: 40,
  },
  headerShadowVisible: false,
  headerLeft: HeaderLeftToDashboard,
};

const DashboardStackNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      options={{ headerShown: false }}
      name="DashboardScreen"
      component={Dashboard}
    />
    <Stack.Screen
      name="RegistroAtividadesCompleto"
      component={RegistroAtividadesCompleto}
    />
    <Stack.Screen
      name="RegistroAtividadeForm"
      component={RegistroAtividadeForm}
      options={{ headerLeft: () => null, gestureEnabled: false }}
    />
  </Stack.Navigator>
);

export default DashboardStackNavigator;
