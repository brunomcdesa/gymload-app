import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import style from './style/style';

const Carga = (props) => {
  const { carga, qtdRepeticoes } = props;
  const { Container, CargaText } = style;

  return (
    <View style={Container}>
      <Text style={CargaText}> {carga} </Text>
      <Text style={CargaText}>
        {' '}
        {qtdRepeticoes ? qtdRepeticoes : 12} repetições
      </Text>
    </View>
  );
};

Carga.propTypes = {
  carga: PropTypes.string.isRequired,
  qtdRepeticoes: PropTypes.number.isRequired,
};

export default Carga;
