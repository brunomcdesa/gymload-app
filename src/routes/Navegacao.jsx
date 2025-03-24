import React from 'react';
import { View } from 'react-native';
import TabNavigator from './TabNavigator';
import style from './styles/style';

const Navegacao = () => (
  <View style={style.Container}>
    <TabNavigator />
  </View>
);

export default Navegacao;
