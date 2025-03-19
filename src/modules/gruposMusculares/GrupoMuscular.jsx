import React from 'react';
import { Text, View } from 'react-native';
import style from './style/style';

const GrupoMuscular = (props) => {
  const { id, nome } = props;
  const { GrupoMuscular, GrupoMuscularContainer, GrupoMuscularText } = style;

  return (
    <View style={GrupoMuscular}>
      <View style={GrupoMuscularContainer}>
        <Text style={GrupoMuscularText}>ID: {id}</Text>
        <Text style={GrupoMuscularText}> Nome: {nome}</Text>
      </View>
    </View>
  );
};

export default GrupoMuscular;
