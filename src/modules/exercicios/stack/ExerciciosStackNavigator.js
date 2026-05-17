import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HeaderLeftBack from '../../../components/Button/HeaderLeftBack';
import { colors } from '../../../components/Styles/ComumStyles';
import RegistroAtividadeForm from '../../registrosAtividades/screens/RegistroAtividadeForm';
import RegistroAtividadesCompleto from '../../registrosAtividades/screens/RegistroAtividadesCompleto';
import ExercicioForm from '../screens/ExercicioForm';
import ExercicioVariacaoForm from '../screens/ExercicioVariacaoForm';
import ListExercicios from '../screens/ListExercicios';
import ListExercicioVariacoes from '../screens/ListExercicioVariacoes';

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

const ExerciciosStackNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      options={{ headerShown: false }}
      name="ListExercicios"
      component={ListExercicios}
    />
    <Stack.Screen name="ExercicioForm" component={ExercicioForm} />
    <Stack.Screen
      name="ExercicioVariacaoForm"
      component={ExercicioVariacaoForm}
    />
    <Stack.Screen
      name="ListExercicioVariacoes"
      component={ListExercicioVariacoes}
    />
    <Stack.Screen
      name="RegistroAtividadesCompleto"
      component={RegistroAtividadesCompleto}
    />
    <Stack.Screen
      name="RegistroAtividadeForm"
      component={RegistroAtividadeForm}
      options={{
        headerLeft: headerLeftHidden,
        headerBackVisible: false,
        gestureEnabled: false,
      }}
    />
  </Stack.Navigator>
);

export default ExerciciosStackNavigator;
