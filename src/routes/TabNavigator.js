import React from 'react';
import Home from '../views/Home';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ExerciciosStack from './StackNavigator';

const Tab = createBottomTabNavigator();

export default (props) => {
  const rotasConfig = [
    {
      name: 'Home',
      component: Home,
      iconName: 'home',
    },
    {
      name: 'Exercicios',
      component: ExerciciosStack,
      iconName: 'fitness-center',
    },
  ];

  const renderTabIcon = (routeName, color, size) => {
    const rotaAtual = rotasConfig.find((rota) => rota.name === routeName);

    return (
      <MaterialIcons name={rotaAtual.iconName} size={size} color={color} />
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) =>
          renderTabIcon(route.name, color, size),
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      {rotasConfig.map((rota) => (
        <Tab.Screen
          key={rota.name}
          name={rota.name}
          component={rota.component}
        />
      ))}
    </Tab.Navigator>
  );
};
