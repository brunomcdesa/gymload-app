import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import RegistroAtividadeForm from '../registrosAtividades/screens/RegistroAtividadeForm';
import RegistroAtividadesCompleto from '../registrosAtividades/screens/RegistroAtividadesCompleto';
import ExercicioForm from '../screens/ExercicioForm';
import ListExercicios from '../screens/ListExercicios';

const Stack = createNativeStackNavigator();

const ExerciciosStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListExercicios" component={ListExercicios} />
      <Stack.Screen name="ExercicioForm" component={ExercicioForm} />
      <Stack.Screen
        name="RegistroAtividadesCompleto"
        component={RegistroAtividadesCompleto}
      />
      <Stack.Screen
        name="RegistroAtividadeForm"
        component={RegistroAtividadeForm}
      />
    </Stack.Navigator>
  );
};

export default ExerciciosStackNavigator;
