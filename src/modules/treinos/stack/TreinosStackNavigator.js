import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HistoricoCargas from '../../exercicios/cargas/HistoricoCargas';
import ListExercicios from '../../exercicios/ListExercicios';
import ListTreino from '../ListTreino';
import TreinoForm from '../TreinoForm';

const Stack = createNativeStackNavigator();

const TreinosStackNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListTreino" component={ListTreino} />
      <Stack.Screen name="TreinoForm" component={TreinoForm} />
      <Stack.Screen name="ListExercicios" component={ListExercicios} />
      <Stack.Screen name="HistoricoCargas" component={HistoricoCargas} />
    </Stack.Navigator>
  );
};

export default TreinosStackNavigator;
