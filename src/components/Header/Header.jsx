import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import style from './style/style';

const Header = () => (
  <SafeAreaView style={style.Header}>
    <Text style={style.HeaderText}>GymLoad</Text>
  </SafeAreaView>
);

export default Header;
