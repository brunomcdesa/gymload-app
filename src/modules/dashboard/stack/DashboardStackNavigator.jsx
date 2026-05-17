import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import HeaderBackButton from '../../../components/Button/HeaderBackButton';
import { colors } from '../../../components/Styles/ComumStyles';
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
  </Stack.Navigator>
);

export default DashboardStackNavigator;
