import React from 'react';
import { Text, View } from 'react-native';
import { ComumStyles } from '../../components/Styles/ComumStyles';

const Home = () => {
  const { container, title } = ComumStyles;

  return (
    <View style={container}>
      <Text style={title}>Seja Bem Vindo!</Text>
    </View>
  );
};

export default Home;
