import React from 'react';
import { Text, View } from 'react-native';
import ComumStyles from '../comum/ComumStyles';
import style from './style/style';

export default (props) => (
  <View style={style.Container}>
    <Text style={ComumStyles.Title}>Seja Bem Vindo!</Text>
  </View>
);
