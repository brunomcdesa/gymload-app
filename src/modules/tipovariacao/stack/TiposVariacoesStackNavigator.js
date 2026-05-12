import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HeaderBackButton from '../../../components/Button/HeaderBackButton';
import { colors } from '../../../components/Styles/ComumStyles';
import ListTiposVariacoes from '../screens/ListTiposVariacoes';
import TipoVariacaoForm from '../screens/TipoVariacaoForm';

const Stack = createNativeStackNavigator();

const TiposVariacoesStackNavigator = () => {
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
        name="ListTiposVariacoes"
        component={ListTiposVariacoes}
      />
      <Stack.Screen name="TipoVariacaoForm" component={TipoVariacaoForm} />
    </Stack.Navigator>
  );
};

export default TiposVariacoesStackNavigator;
