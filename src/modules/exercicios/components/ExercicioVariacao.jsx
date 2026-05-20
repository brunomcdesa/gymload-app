import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { colors, ComumStyles } from '../../../components/Styles/ComumStyles';
import { AuthContext } from '../../../context/AuthProvider';
import {
  renderIconeGrupoMuscular,
  renderIconeTipoExercicio,
} from '../../utils/iconesUtils';
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
    exercicioNome,
    grupoMuscularText,
    destaquesRow,
    destaqueBox,
    destaqueLabel,
    ultimoDadoValue,
    nomeBadgeRow,
    padraoBadge,
    padraoBadgeText,
    cardRow,
    iconBox,
    exercicioInfo,
    semRegistrosLabel,
  } = style;
  const { elementContainer } = ComumStyles;

  const { user } = useContext(AuthContext);
  const isSexoFeminino = user?.sexo === 'FEMININO';

  const hasData = ultimaCarga || ultimaDistancia || ultimaSerie;
  const iconBg = hasData ? `${colors.secondary}1a` : colors.inputBackground;

  const renderIcone = () => {
    if (grupoMuscular)
      return renderIconeGrupoMuscular(grupoMuscular, isSexoFeminino, 28);
    return renderIconeTipoExercicio(tipoExercicio, isSexoFeminino, 28);
  };

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

    return <Text style={semRegistrosLabel}>Sem registros ainda</Text>;
  };

  return (
    <View style={elementContainer}>
      <View style={cardRow}>
        <View style={[iconBox, { backgroundColor: iconBg }]}>
          {renderIcone()}
        </View>
        <View style={exercicioInfo}>
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
