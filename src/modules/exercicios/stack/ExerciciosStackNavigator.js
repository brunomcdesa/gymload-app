import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ExercicioForm from '../ExercicioForm';
import ListExercicios from '../ListExercicios';
import CargaForm from '../cargas/CargaForm';
import HistoricoCargas from '../cargas/HistoricoCargas';

const Stack = createNativeStackNavigator();

const ExerciciosStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListExercicios" component={ListExercicios} />
      <Stack.Screen name="ExercicioForm" component={ExercicioForm} />
      <Stack.Screen name="HistoricoCargas" component={HistoricoCargas} />
      <Stack.Screen name="CargaForm" component={CargaForm} />
    </Stack.Navigator>
  );
};

export default ExerciciosStackNavigator;
