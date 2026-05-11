import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../components/Styles/ComumStyles';
import {
  HEADER_SUBTITLE_DASHBOARD,
  HEADER_SUBTITLE_EXERCICIOS,
  HEADER_SUBTITLE_GRUPOS_MUSCULARES,
  HEADER_SUBTITLE_PERFIL,
  HEADER_SUBTITLE_TREINOS,
  HEADER_TITLE_DASHBOARD,
  HEADER_TITLE_EXERCICIOS,
  HEADER_TITLE_GRUPOS_MUSCULARES,
  HEADER_TITLE_PERFIL,
  HEADER_TITLE_TREINOS,
} from '../comum/constants';
import { useHeaderContext } from '../context/HeaderProvider';
import DashboardStack from '../modules/dashboard/stack/DashboardStackNavigator';
import ExerciciosStack from '../modules/exercicios/stack/ExerciciosStackNavigator';
import GruposMuscularesStack from '../modules/gruposMusculares/stack/GruposMuscularesStackNavigator';
import TreinosStack from '../modules/treinos/stack/TreinosStackNavigator';
import PerfilStack from '../modules/usuario/stack/PerfilStackNavigator';
import { useIsAdmin } from '../modules/utils/userUtils';
import ScreenWrapper from './ScreenWrapper';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const isAdmin = useIsAdmin();
  const { setActiveTabOptions } = useHeaderContext();

  const rotasConfig = [
    {
      name: 'Dashboard',
      component: DashboardStack,
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
    {
      name: 'Perfil',
      component: PerfilStack,
      iconName: 'person',
      headerTitle: HEADER_TITLE_PERFIL,
      headerSubtitle: HEADER_SUBTITLE_PERFIL,
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
    return rotaAtual ? (
      <MaterialIcons name={rotaAtual.iconName} size={size} color={color} />
    ) : null;
  };

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
      {rotasConfig.map((rota) => (
        <Tab.Screen
          key={rota.name}
          name={rota.name}
          listeners={{
            focus: () => {
              setActiveTabOptions({
                headerTitle: rota.headerTitle,
                headerSubtitle: rota.headerSubtitle,
              });
            },
          }}
        >
          {(props) => <ScreenWrapper {...props} Component={rota.component} />}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
