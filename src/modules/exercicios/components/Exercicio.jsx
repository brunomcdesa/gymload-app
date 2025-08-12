import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import style from '../style/style';

const Exercicio = (props) => {
  const { exercicioData, dadosRegistrosAtividades } = props;
  const { nome, grupoMuscular } = exercicioData;
  const { destaque, ultimaCarga, ultimaDistancia } = dadosRegistrosAtividades;
  const {
    exercicioHeader,
    exercicioNome,
    grupoMuscularText,
    historicoSection,
    recordeValue,
    ultimoDadoValue,
    divider,
    destaquesRow,
    destaqueBox,
    destaqueLabel,
  } = style;
  const { elementContainer } = ComumStyles;

  const hasDestaque =
    dadosRegistrosAtividades !== null && dadosRegistrosAtividades !== undefined;
  const showDistancia = ultimaDistancia && !ultimaCarga;

  return (
    <View style={elementContainer}>
      <View style={exercicioHeader}>
        <Text style={exercicioNome}>{nome}</Text>
        {grupoMuscular && (
          <Text style={grupoMuscularText}>{grupoMuscular}</Text>
        )}
      </View>

      {hasDestaque && (
        <View style={historicoSection}>
          <View style={divider} />

          <View style={destaquesRow}>
            <View style={destaqueBox}>
              <Text style={destaqueLabel}>RECORDE</Text>
              <Text style={recordeValue}>{destaque || '-'}</Text>
            </View>

            <View style={destaqueBox}>
              <Text style={destaqueLabel}>
                {showDistancia ? 'ÚLTIMA DISTÂNCIA' : 'ÚLTIMA CARGA'}
              </Text>
              <Text style={ultimoDadoValue}>
                {showDistancia ? ultimaDistancia : ultimaCarga || '-'}
              </Text>
            </View>
          </View>

          <View style={divider} />
        </View>
      )}
    </View>
  );
};

Exercicio.propTypes = {
  exercicioData: PropTypes.object.isRequired,
  dadosRegistrosAtividades: PropTypes.object.isRequired,
};

export default Exercicio;
