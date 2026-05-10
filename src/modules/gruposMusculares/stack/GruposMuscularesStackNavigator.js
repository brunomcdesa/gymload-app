import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HeaderBackButton from '../../../components/Button/HeaderBackButton';
import GrupoMuscularForm from '../screens/GrupoMuscularForm';
import ListGruposMusculares from '../screens/ListGruposMusculares';

const Stack = createNativeStackNavigator();

const GruposMuscularesStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1d1d1d',
          borderBottomWidth: 1,
          borderBottomColor: '#333',
        },
        headerShadowVisible: false,
        headerLeft: () => <HeaderBackButton onPress={navigation.goBack} />,
      })}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="GruposMusculares"
        component={ListGruposMusculares}
      />
      <Stack.Screen name="GrupoMuscularForm" component={GrupoMuscularForm} />
    </Stack.Navigator>
  );
};

export default GruposMuscularesStackNavigator;
