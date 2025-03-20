import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import style from './style/style';

const Carga = (props) => {
  const { carga, tipoExercicio, grupoMuscularNome, qtdRepeticoes } = props;
  const { Container, CargaText } = style;

  return (
    <View style={Container}>
      <Text style={CargaText}> Carga: {carga} </Text>
      <Text style={CargaText}> TipoExercicio: {tipoExercicio} </Text>
      <Text style={CargaText}> Grupo Muscular: {grupoMuscularNome} </Text>
      <Text style={CargaText}>
        {' '}
        Quantidade de Repetições: {qtdRepeticoes ? qtdRepeticoes : 12}{' '}
      </Text>
    </View>
  );
};

Carga.propTypes = {
  carga: PropTypes.string.isRequired,
  tipoExercicio: PropTypes.string.isRequired,
  grupoMuscularNome: PropTypes.string.isRequired,
  qtdRepeticoes: PropTypes.number.isRequired,
};

export default Carga;
