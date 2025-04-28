import React, { memo, useCallback } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useHeaderContext } from '../components/Header/HeaderProvider';
import { colors } from '../components/Styles/ComumStyles';
import {
  HEADER_SUBTITLE_DASHBOARD,
  HEADER_SUBTITLE_EXERCICIOS,
  HEADER_SUBTITLE_GRUPOS_MUSCULARES,
  HEADER_SUBTITLE_TREINOS,
  HEADER_TITLE_DASHBOARD,
  HEADER_TITLE_EXERCICIOS,
  HEADER_TITLE_GRUPOS_MUSCULARES,
  HEADER_TITLE_TREINOS,
} from '../comum/constants';
import Dashboard from '../modules/dashboard/Dashboard';
import ExerciciosStack from '../modules/exercicios/stack/ExerciciosStackNavigator';
import GruposMuscularesStack from '../modules/gruposMusculares/stack/GruposMuscularesStackNavigator';
import TreinosStack from '../modules/treinos/stack/TreinosStackNavigator';
import { useIsAdmin } from '../modules/utils/userUtils';

const Tab = createBottomTabNavigator();

const ScreenWrapper = memo(
  ({ headerTitle, headerSubtitle, Component, onFocus }) => {
    useFocusEffect(
      useCallback(() => {
        onFocus(headerTitle, headerSubtitle);
        return () => {};
      }, [headerTitle, headerSubtitle, onFocus]),
    );

    return <Component />;
  },
);

const TabNavigator = () => {
  const isAdmin = useIsAdmin();
  const { setActiveTabOptions } = useHeaderContext();

  const rotasConfig = [
    {
      name: 'Dashboard',
      component: Dashboard,
      iconName: 'dashboard',
      headerTitle: HEADER_TITLE_DASHBOARD,
      headerSubtitle: HEADER_SUBTITLE_DASHBOARD,
    },
    {
      name: 'Exercícios',
      component: ExerciciosStack,
      iconName: 'fitness-center',
      headerTitle: HEADER_TITLE_EXERCICIOS,
      headerSubtitle: HEADER_SUBTITLE_EXERCICIOS,
    },
    {
      name: 'Treinos',
      component: TreinosStack,
      iconName: 'playlist-add-check',
      headerTitle: HEADER_TITLE_TREINOS,
      headerSubtitle: HEADER_SUBTITLE_TREINOS,
    },
    ...(isAdmin
      ? [
          {
            name: 'Grupos Musculares',
            component: GruposMuscularesStack,
            iconName: 'man',
            headerTitle: HEADER_TITLE_GRUPOS_MUSCULARES,
            headerSubtitle: HEADER_SUBTITLE_GRUPOS_MUSCULARES,
          },
        ]
      : []),
  ];

  const renderTabIcon = (routeName, color, size) => {
    const rotaAtual = rotasConfig.find((rota) => rota.name === routeName);
    return (
      <MaterialIcons name={rotaAtual.iconName} size={size} color={color} />
    );
  };

  const handleTabSelect = useCallback(
    (headerTitle, headerSubtitle) => {
      setActiveTabOptions({ headerTitle, headerSubtitle });
    },
    [setActiveTabOptions],
  );

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) =>
          renderTabIcon(route.name, color, size * 1.2),
        tabBarLabel: route.name,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.primary,
        tabBarStyle: {
          backgroundColor: colors.background,
          height: 60,
          borderTopWidth: 0,
          elevation: 10,
        },
        headerShown: false,
      })}
    >
      {rotasConfig.map((rota) => {
        const TabComponent = () => (
          <ScreenWrapper
            headerTitle={rota.headerTitle}
            headerSubtitle={rota.headerSubtitle}
            Component={rota.component}
            onFocus={handleTabSelect}
          />
        );

        return (
          <Tab.Screen
            key={rota.name}
            name={rota.name}
            component={TabComponent}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default TabNavigator;
