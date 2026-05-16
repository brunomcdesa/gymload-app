import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HeaderBackButton from '../../../components/Button/HeaderBackButton';
import { colors } from '../../../components/Styles/ComumStyles';
import ListExerciciosTreino from '../../exercicios/screens/ListExerciciosTreino';
import RegistroAtividadeForm from '../../registrosAtividades/screens/RegistroAtividadeForm';
import RegistroAtividadesCompleto from '../../registrosAtividades/screens/RegistroAtividadesCompleto';
import CompartilharTreino from '../screens/CompartilharTreino';
import ImportarTreino from '../screens/ImportarTreino';
import ListTreino from '../screens/ListTreino';
import TreinoForm from '../screens/TreinoForm';

const Stack = createNativeStackNavigator();

const TreinosStackNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerShadowVisible: false,
        headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
      })}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="ListTreino"
        component={ListTreino}
      />
      <Stack.Screen name="TreinoForm" component={TreinoForm} />
      <Stack.Screen
        name="ListExerciciosTreino"
        component={ListExerciciosTreino}
      />
      <Stack.Screen
        name="RegistroAtividadesCompleto"
        component={RegistroAtividadesCompleto}
      />
      <Stack.Screen
        name="RegistroAtividadeForm"
        component={RegistroAtividadeForm}
        options={{
          headerLeft: () => null,
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name="CompartilharTreino" component={CompartilharTreino} />
      <Stack.Screen name="ImportarTreino" component={ImportarTreino} />
    </Stack.Navigator>
  );
};

export default TreinosStackNavigator;
