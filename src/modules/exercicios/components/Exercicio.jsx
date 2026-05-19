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
  const {
    destaque,
    ultimaCarga,
    ultimaDistancia,
    nomeVariacaoDestaque,
    nomeVariacaoUltima,
    qtdVariacoes,
  } = dadosRegistrosAtividades || {};
  const { elementContainer } = ComumStyles;
  const { user } = useContext(AuthContext);
  const isSexoFeminino = user?.sexo === 'FEMININO';

  const temRegistros = destaque && destaque !== '-';
  const hasRecord = temRegistros;
  const hasDestaque = temRegistros && dadosRegistrosAtividades != null;
  const showDistancia = ultimaDistancia && !ultimaCarga;
  const semRegistrosComVariacao = possuiVariacao && !temRegistros;
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
          {possuiVariacao && qtdVariacoes > 0 && (
            <View style={style.variacoesChip}>
              <MaterialIcons name="layers" size={11} color={colors.secondary} />
              <Text style={style.variacoesChipText}>
                {`${qtdVariacoes} ${qtdVariacoes === 1 ? 'variação' : 'variações'}`}
              </Text>
            </View>
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
      {semRegistrosComVariacao ? (
        <Text style={style.semRegistrosLabel}>Sem registros ainda</Text>
      ) : (
        hasDestaque && (
          <View style={style.destaquesRow}>
            <View style={style.destaqueBox}>
              <Text style={style.destaqueLabel}>RECORDE</Text>
              <Text style={style.recordeValue}>{destaque || '-'}</Text>
              {nomeVariacaoDestaque && (
                <Text style={style.variacaoAtribuicaoText} numberOfLines={1}>
                  {nomeVariacaoDestaque}
                </Text>
              )}
            </View>
            <View style={style.statDivider} />
            <View style={style.destaqueBox}>
              <Text style={style.destaqueLabel}>
                {showDistancia ? 'ÚLTIMA DISTÂNCIA' : 'ÚLTIMA CARGA'}
              </Text>
              <Text style={style.ultimoDadoValue}>
                {showDistancia ? ultimaDistancia : ultimaCarga || '-'}
              </Text>
              {nomeVariacaoUltima && (
                <Text style={style.variacaoAtribuicaoText} numberOfLines={1}>
                  {nomeVariacaoUltima}
                </Text>
              )}
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
