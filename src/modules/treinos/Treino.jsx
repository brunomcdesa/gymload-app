import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { ComumStyles } from '../../components/Styles/ComumStyles';

const Treino = (props) => {
  const { elementContainer, subTitle, subSubTitle } = ComumStyles;

  return (
    <View style={elementContainer}>
      <Text style={subTitle}>{props.nome}</Text>
      <Text style={subSubTitle}>{props.dataCadastro}</Text>
    </View>
  );
};

Treino.propTypes = {
  nome: PropTypes.string.isRequired,
  dataCadastro: PropTypes.string.isRequired,
};
export default Treino;
