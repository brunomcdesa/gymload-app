import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ExerciciosStack from '../modules/exercicios/stack/ExerciciosStackNavigator';
import GruposMuscularesStack from '../modules/gruposMusculares/stack/GruposMuscularesStackNavigator';
import Home from '../modules/home/Home';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
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
    {
      name: 'Grupos Musculares',
      component: GruposMuscularesStack,
      iconName: 'man',
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
        tabBarIcon: ({ color, size }) => renderTabIcon(route.name, color, size),
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

export default TabNavigator;
