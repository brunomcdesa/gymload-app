import React from 'react';
import { Text, View } from 'react-native';

export default (props) => {
  return (
    <View>
      <Text> Carga: {props.carga} </Text>
      <Text> TipoExercicio: {props.tipoExercicio} </Text>
      <Text> Grupo Muscular: {props.grupoMuscular} </Text>
      <Text> Quantidade de Repetições: {props.qtdRepeticoes} </Text>
    </View>
  );
};
