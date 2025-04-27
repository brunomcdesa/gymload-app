import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { ComumStyles } from '../../components/Styles/ComumStyles';
import style from './style/style';

const GrupoMuscular = (props) => {
  const { nome } = props;
  const { grupoMuscularNome } = style;
  const { elementContainer } = ComumStyles;

  return (
    <View style={elementContainer}>
      <Text style={grupoMuscularNome}>{nome}</Text>
    </View>
  );
};

GrupoMuscular.propTypes = {
  nome: PropTypes.string.isRequired,
};

export default GrupoMuscular;
