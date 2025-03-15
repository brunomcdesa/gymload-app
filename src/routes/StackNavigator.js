import React from 'react';
import ListExercicios from '../views/ListExercicios';
import HistoricoCargas from '../modules/cargas/HistoricoCargas';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default props => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Exercicios" component={ListExercicios} />
      <Stack.Screen name="HistoricoCargas" component={HistoricoCargas} />
    </Stack.Navigator>
  );
};
