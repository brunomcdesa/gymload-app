import React from 'react';
import { Text, View } from 'react-native';
import ComumStyles from '../../components/Styles/ComumStyles';
import style from './style/style';

const Home = () => (
  <View style={style.Container}>
    <Text style={ComumStyles.Title}>Seja Bem Vindo!</Text>
  </View>
);

export default Home;
