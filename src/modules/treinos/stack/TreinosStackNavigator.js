import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HistoricoCargas from '../../exercicios/cargas/HistoricoCargas';

import CargaForm from '../../exercicios/cargas/CargaForm';
import ListExerciciosTreino from '../../exercicios/screens/ListExerciciosTreino';
import ListTreino from '../screens/ListTreino';
import TreinoForm from '../screens/TreinoForm';

const Stack = createNativeStackNavigator();

const TreinosStackNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListTreino" component={ListTreino} />
      <Stack.Screen name="TreinoForm" component={TreinoForm} />
      <Stack.Screen
        name="ListExerciciosTreino"
        component={ListExerciciosTreino}
      />
      <Stack.Screen name="HistoricoCargas" component={HistoricoCargas} />
      <Stack.Screen name="CargaForm" component={CargaForm} />
    </Stack.Navigator>
  );
};

export default TreinosStackNavigator;
