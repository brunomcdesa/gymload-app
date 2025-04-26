import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { ComumStyles } from '../../components/Styles/ComumStyles';
import style from './style/style';

const GrupoMuscular = (props) => {
  const { nome } = props;
  const { GrupoMuscularContainer } = style;
  const { elementContainer, subTitle } = ComumStyles;

  return (
    <View style={elementContainer}>
      <View style={GrupoMuscularContainer}>
        <Text style={subTitle}>{nome}</Text>
      </View>
    </View>
  );
};

GrupoMuscular.propTypes = {
  nome: PropTypes.string.isRequired,
};

export default GrupoMuscular;
