import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HeaderLeftBack from '../../../components/Button/HeaderLeftBack';
import { colors } from '../../../components/Styles/ComumStyles';
import GrupoMuscularForm from '../screens/GrupoMuscularForm';
import ListGruposMusculares from '../screens/ListGruposMusculares';

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

const GruposMuscularesStackNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      options={{ headerShown: false }}
      name="GruposMusculares"
      component={ListGruposMusculares}
    />
    <Stack.Screen
      name="GrupoMuscularForm"
      component={GrupoMuscularForm}
      options={{
        headerLeft: headerLeftHidden,
        headerBackVisible: false,
        gestureEnabled: false,
      }}
    />
  </Stack.Navigator>
);

export default GruposMuscularesStackNavigator;
