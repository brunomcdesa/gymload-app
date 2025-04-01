import React from 'react';
import { Text, View } from 'react-native';
import { ComumStyles } from '../../components/Styles/ComumStyles';

const Treino = (props) => {
  const { ElementContainer, SubTitle, SubSubTitle } = ComumStyles;

  return (
    <View style={ElementContainer}>
      <Text style={SubTitle}>{props.nome}</Text>
      <Text style={SubSubTitle}>{props.dataCadastro}</Text>
    </View>
  );
};

export default Treino;
