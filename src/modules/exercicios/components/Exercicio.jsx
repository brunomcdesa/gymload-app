import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, ComumStyles } from '../../../components/Styles/ComumStyles';
import style from '../style/style';

const ICONE_TIPO = {
  MUSCULACAO: 'fitness_center',
  CALISTENIA: 'sports_gymnastics',
  AEROBICO: 'directions_run',
};

const Exercicio = ({
  exercicioData,
  dadosRegistrosAtividades,
  onViewHistorico,
}) => {
  const { nome, grupoMuscular, tipoExercicio } = exercicioData;
  const { destaque, ultimaCarga, ultimaDistancia } =
    dadosRegistrosAtividades || {};
  const { elementContainer } = ComumStyles;

  const hasRecord = destaque && destaque !== '-';
  const hasDestaque = dadosRegistrosAtividades != null;
  const showDistancia = ultimaDistancia && !ultimaCarga;
  const iconName = ICONE_TIPO[tipoExercicio] || 'fitness_center';
  const iconBg = hasRecord ? `${colors.secondary}1a` : colors.inputBackground;
  const iconColor = hasRecord ? colors.secondary : colors.terciary;

  return (
    <View style={elementContainer}>
      {/* Header row: icon + name/group + PR badge */}
      <View style={style.cardRow}>
        <View style={[style.iconBox, { backgroundColor: iconBg }]}>
          <MaterialIcons name={iconName} size={24} color={iconColor} />
        </View>
        <View style={style.exercicioInfo}>
          <Text style={style.exercicioNome}>{nome}</Text>
          {grupoMuscular && (
            <Text style={style.grupoMuscularText}>{grupoMuscular}</Text>
          )}
        </View>
        {hasRecord && (
          <View style={style.recordeBadge}>
            <MaterialIcons name="emoji_events" size={10} color="#fff" />
            <Text style={style.recordeBadgeText}>PR</Text>
          </View>
        )}
      </View>

      {/* Stats row */}
      {hasDestaque && (
        <View style={style.destaquesRow}>
          <View style={style.destaqueBox}>
            <Text style={style.destaqueLabel}>RECORDE</Text>
            <Text style={style.recordeValue}>{destaque || '-'}</Text>
          </View>
          <View style={style.statDivider} />
          <View style={style.destaqueBox}>
            <Text style={style.destaqueLabel}>
              {showDistancia ? 'ÚLTIMA DISTÂNCIA' : 'ÚLTIMA CARGA'}
            </Text>
            <Text style={style.ultimoDadoValue}>
              {showDistancia ? ultimaDistancia : ultimaCarga || '-'}
            </Text>
          </View>
        </View>
      )}

      {/* VER HISTÓRICO button */}
      <TouchableOpacity
        style={style.viewHistoryButton}
        onPress={onViewHistorico}
        activeOpacity={0.75}
      >
        <MaterialIcons name="history" size={16} color="#fff" />
        <Text style={style.viewHistoryText}>VER HISTÓRICO</Text>
      </TouchableOpacity>
    </View>
  );
};

Exercicio.propTypes = {
  exercicioData: PropTypes.object.isRequired,
  dadosRegistrosAtividades: PropTypes.object,
  onViewHistorico: PropTypes.func.isRequired,
};

export default Exercicio;
