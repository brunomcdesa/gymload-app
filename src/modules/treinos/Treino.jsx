import PropTypes from 'prop-types';
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

Treino.propTypes = {
  nome: PropTypes.string.isRequired,
  dataCadastro: PropTypes.string.isRequired,
};
export default Treino;
