import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import style from '../style/style';

const RegistroCarga = (props) => {
  const { carga, qtdRepeticoes } = props;
  const { registroCargaContainer, cargaText, repeticoesText } = style;

  return (
    <View style={registroCargaContainer}>
      <Text style={[cargaText, style]}>{carga}</Text>
      <Text style={repeticoesText}>{qtdRepeticoes} reps</Text>
    </View>
  );
};

RegistroCarga.propTypes = {
  carga: PropTypes.string.isRequired,
  qtdRepeticoes: PropTypes.number.isRequired,
};

export default RegistroCarga;
