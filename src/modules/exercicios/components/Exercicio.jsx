import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnimatedPressable from '../../../components/Button/AnimatedPressable';
import { colors, ComumStyles } from '../../../components/Styles/ComumStyles';
import { AuthContext } from '../../../context/AuthProvider';
import {
  renderIconeGrupoMuscular,
  renderIconeTipoExercicio,
} from '../../utils/iconesUtils';
import style from '../style/style';

const Exercicio = ({
  exercicioData,
  dadosRegistrosAtividades,
  onViewHistorico,
}) => {
  const { nome, grupoMuscularNome, tipoExercicio, possuiVariacao } =
    exercicioData;
  const { destaque, ultimaCarga, ultimaDistancia } =
    dadosRegistrosAtividades || {};
  const { elementContainer } = ComumStyles;
  const { user } = useContext(AuthContext);
  const isSexoFeminino = user?.sexo === 'FEMININO';

  const hasRecord = !possuiVariacao && destaque && destaque !== '-';
  const hasDestaque = !possuiVariacao && dadosRegistrosAtividades != null;
  const showDistancia = ultimaDistancia && !ultimaCarga;
  const iconBg = hasRecord ? `${colors.secondary}1a` : colors.inputBackground;

  const renderIcone = () => {
    if (grupoMuscularNome)
      return renderIconeGrupoMuscular(grupoMuscularNome, isSexoFeminino, 36);
    return renderIconeTipoExercicio(tipoExercicio, isSexoFeminino, 36);
  };

  return (
    <View style={elementContainer}>
      {/* Header row: icon + name/group + PR badge */}
      <View style={style.cardRow}>
        <View style={[style.iconBox, { backgroundColor: iconBg }]}>
          {renderIcone()}
        </View>
        <View style={style.exercicioInfo}>
          <Text style={style.exercicioNome}>{nome}</Text>
          {grupoMuscularNome && (
            <Text style={style.grupoMuscularText}>{grupoMuscularNome}</Text>
          )}
        </View>
        {hasRecord && (
          <View style={style.recordeBadge}>
            <MaterialIcons name="emoji-events" size={10} color="#fff" />
            <Text style={style.recordeBadgeText}>PR</Text>
          </View>
        )}
      </View>

      {/* Stats row */}
      {possuiVariacao ? (
        <Text style={style.possuiVariacoesLabel}>Possui variações</Text>
      ) : (
        hasDestaque && (
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
        )
      )}

      {/* VER HISTÓRICO button */}
      <AnimatedPressable
        style={style.viewHistoryButton}
        onPress={onViewHistorico}
      >
        <MaterialIcons name="history" size={16} color="#fff" />
        <Text style={style.viewHistoryText}>VER HISTÓRICO</Text>
      </AnimatedPressable>
    </View>
  );
};

Exercicio.propTypes = {
  exercicioData: PropTypes.object.isRequired,
  dadosRegistrosAtividades: PropTypes.object,
  onViewHistorico: PropTypes.func.isRequired,
};

export default Exercicio;
