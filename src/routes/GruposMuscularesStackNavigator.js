import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import GrupoMuscularForm from '../modules/gruposMusculares/GrupoMuscularForm';
import ListGruposMusculares from '../views/ListGruposMusculares';

const Stack = createNativeStackNavigator();

const GruposMuscularesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GruposMusculares" component={ListGruposMusculares} />
      <Stack.Screen name="GrupoMuscularForm" component={GrupoMuscularForm} />
    </Stack.Navigator>
  );
};

export default GruposMuscularesStackNavigator;
