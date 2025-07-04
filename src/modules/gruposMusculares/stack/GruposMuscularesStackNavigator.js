import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HeaderBackButton from '../../../components/Button/HeaderBackButton';
import { colors } from '../../../components/Styles/ComumStyles';
import GrupoMuscularForm from '../screens/GrupoMuscularForm';
import ListGruposMusculares from '../screens/ListGruposMusculares';

const Stack = createNativeStackNavigator();

const GruposMuscularesStackNavigator = () => {
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
        name="GruposMusculares"
        component={ListGruposMusculares}
      />
      <Stack.Screen name="GrupoMuscularForm" component={GrupoMuscularForm} />
    </Stack.Navigator>
  );
};

export default GruposMuscularesStackNavigator;
