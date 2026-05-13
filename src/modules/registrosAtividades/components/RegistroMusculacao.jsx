import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import style from '../style/style';

const RegistroMusculacao = (props) => {
  const { registroData } = props;
  const { qtdSeries, carga, qtdRepeticoes, observacao } = registroData;
  const { elementContainer } = ComumStyles;
  const {
    destaquesRow,
    destaqueBox,
    destaqueLabel,
    destaqueValue,
    statDivider,
    observacaoText,
  } = style;

  return (
    <View style={elementContainer}>
      <View style={destaquesRow}>
        <View style={destaqueBox}>
          <Text style={destaqueLabel}>Séries</Text>
          <Text style={destaqueValue}>{qtdSeries}x</Text>
        </View>
        <View style={statDivider} />
        <View style={destaqueBox}>
          <Text style={destaqueLabel}>Carga</Text>
          <Text style={destaqueValue}>{carga}</Text>
        </View>
        <View style={statDivider} />
        <View style={destaqueBox}>
          <Text style={destaqueLabel}>Reps</Text>
          <Text style={destaqueValue}>{qtdRepeticoes}</Text>
        </View>
      </View>
      {observacao ? <Text style={observacaoText}>{observacao}</Text> : null}
    </View>
  );
};

RegistroMusculacao.propTypes = {
  registroData: PropTypes.object.isRequired,
};

export default RegistroMusculacao;
