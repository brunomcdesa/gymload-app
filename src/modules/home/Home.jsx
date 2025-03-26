import React from 'react';
import { Text, View } from 'react-native';
import { ComumStyles } from '../../components/Styles/ComumStyles';

const Home = () => {
  const { Container, Title } = ComumStyles;

  return (
    <View style={Container}>
      <Text style={Title}>Seja Bem Vindo!</Text>
    </View>
  );
};

export default Home;
