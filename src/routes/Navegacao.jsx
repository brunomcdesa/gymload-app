import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import TabNavigator from './TabNavigator';
import style from './styles/style';

const Navegacao = () => (
  <View style={style.Container}>
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  </View>
);

export default Navegacao;
