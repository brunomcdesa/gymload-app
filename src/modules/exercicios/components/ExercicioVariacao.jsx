import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import style from '../style/style';

const ExercicioVariacao = (props) => {
  const { exercicioVariacaoData, tipoExercicio } = props;
  const {
    nome,
    grupoMuscular,
    ultimaCarga,
    ultimaDistancia,
    ultimaSerie,
    padrao,
  } = exercicioVariacaoData;
  const {
    exercicioHeader,
    exercicioNome,
    grupoMuscularText,
    destaquesRow,
    destaqueBox,
    destaqueLabel,
    ultimoDadoValue,
    nomeBadgeRow,
    padraoBadge,
    padraoBadgeText,
  } = style;
  const { elementContainer } = ComumStyles;

  const renderDestaque = () => {
    if (tipoExercicio === 'AEROBICO' && ultimaDistancia) {
      return (
        <View style={destaquesRow}>
          <View style={destaqueBox}>
            <Text style={destaqueLabel}>ÚLTIMA DISTÂNCIA</Text>
            <Text style={ultimoDadoValue}>{ultimaDistancia}</Text>
          </View>
        </View>
      );
    }

    if (tipoExercicio === 'CALISTENIA' && ultimaSerie) {
      return (
        <View style={destaquesRow}>
          <View style={destaqueBox}>
            <Text style={destaqueLabel}>ÚLTIMA SÉRIE</Text>
            <Text style={ultimoDadoValue}>{ultimaSerie}</Text>
          </View>
        </View>
      );
    }

    if (ultimaCarga) {
      return (
        <View style={destaquesRow}>
          <View style={destaqueBox}>
            <Text style={destaqueLabel}>ÚLTIMA CARGA</Text>
            <Text style={ultimoDadoValue}>{ultimaCarga}</Text>
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={elementContainer}>
      <View style={exercicioHeader}>
        <View style={nomeBadgeRow}>
          <Text style={exercicioNome}>{nome}</Text>
          {padrao && (
            <View style={padraoBadge}>
              <Text style={padraoBadgeText}>PADRÃO</Text>
            </View>
          )}
        </View>
        {grupoMuscular && (
          <Text style={grupoMuscularText}>{grupoMuscular}</Text>
        )}
      </View>
      {renderDestaque()}
    </View>
  );
};

ExercicioVariacao.propTypes = {
  exercicioVariacaoData: PropTypes.object.isRequired,
  tipoExercicio: PropTypes.string,
};

export default ExercicioVariacao;
