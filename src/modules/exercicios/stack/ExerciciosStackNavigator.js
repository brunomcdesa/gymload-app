import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CargaForm from '../cargas/screens/CargaForm';
import HistoricoCargas from '../cargas/screens/HistoricoCargas';
import HistoricoCompletoCargas from '../cargas/screens/HistoricoCompletoCargas';
import ExercicioForm from '../screens/ExercicioForm';
import ListExercicios from '../screens/ListExercicios';

const Stack = createNativeStackNavigator();

const ExerciciosStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListExercicios" component={ListExercicios} />
      <Stack.Screen name="ExercicioForm" component={ExercicioForm} />
      <Stack.Screen name="HistoricoCargas" component={HistoricoCargas} />
      <Stack.Screen
        name="HistoricoCompletoCargas"
        component={HistoricoCompletoCargas}
      />
      <Stack.Screen name="CargaForm" component={CargaForm} />
    </Stack.Navigator>
  );
};

export default ExerciciosStackNavigator;
