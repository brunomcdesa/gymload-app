import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import HeaderBackButton from '../../../components/Button/HeaderBackButton';
import { colors } from '../../../components/Styles/ComumStyles';
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
    </Stack.Navigator>
  );
};

export default DashboardStackNavigator;
