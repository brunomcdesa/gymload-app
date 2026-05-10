import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import style from './style/style';

const GrupoMuscular = (props) => {
  const { nome } = props;
  const { cardContainer, stripe, iconContainer, nomeText } = style;

  return (
    <View style={cardContainer}>
      <View style={stripe} />
      <View style={iconContainer}>
        <MaterialIcons name="man" size={22} color="#ff5555" />
      </View>
      <Text style={nomeText}>{nome}</Text>
    </View>
  );
};

GrupoMuscular.propTypes = {
  nome: PropTypes.string.isRequired,
};

export default GrupoMuscular;
