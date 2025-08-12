import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import style from '../style/style';

const ExercicioVariacao = (props) => {
  const { exercicioVariacaoData } = props;
  const { nome, grupoMuscular } = exercicioVariacaoData;
  const { exercicioHeader, exercicioNome, grupoMuscularText } = style;
  const { elementContainer } = ComumStyles;

  return (
    <View style={elementContainer}>
      <View style={exercicioHeader}>
        <Text style={exercicioNome}>{nome}</Text>
        {grupoMuscular && (
          <Text style={grupoMuscularText}>{grupoMuscular}</Text>
        )}
      </View>
    </View>
  );
};

ExercicioVariacao.propTypes = {
  exercicioVariacaoData: PropTypes.object.isRequired,
};

export default ExercicioVariacao;
