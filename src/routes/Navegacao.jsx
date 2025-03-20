import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import TabNavigator from './TabNavigator';

const Navegacao = () => (
  <View style={{ flex: 1 }}>
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  </View>
);

export default Navegacao;
