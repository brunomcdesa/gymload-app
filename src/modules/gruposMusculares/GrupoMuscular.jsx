import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { ComumStyles } from '../../components/Styles/ComumStyles';
import style from './style/style';

const GrupoMuscular = (props) => {
  const { nome } = props;
  const { GrupoMuscularContainer } = style;
  const { ElementContainer, SubTitle } = ComumStyles;

  return (
    <View style={ElementContainer}>
      <View style={GrupoMuscularContainer}>
        <Text style={SubTitle}>{nome}</Text>
      </View>
    </View>
  );
};

GrupoMuscular.propTypes = {
  nome: PropTypes.string.isRequired,
};

export default GrupoMuscular;
