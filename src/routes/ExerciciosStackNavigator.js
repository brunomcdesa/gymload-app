import React from 'react';
import ListExercicios from '../views/ListExercicios';
import HistoricoCargas from '../modules/cargas/HistoricoCargas';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CargaForm from '../modules/cargas/CargaForm';

const Stack = createNativeStackNavigator();

const ExerciciosStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Exercicios" component={ ListExercicios } />
      <Stack.Screen name="HistoricoCargas" component={ HistoricoCargas } />
      <Stack.Screen name='CargaForm' component={ CargaForm } />
    </Stack.Navigator>
  );
};

export default ExerciciosStackNavigator;
