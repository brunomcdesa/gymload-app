import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import style from '../style/style';

const RegistroAerobico = (props) => {
  const { registroData } = props;
  const { distancia, duracao, velocidadeMedia, observacao } = registroData;
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
          <Text style={destaqueLabel}>Duração</Text>
          <Text style={destaqueValue}>{duracao} h</Text>
        </View>
        <View style={statDivider} />
        <View style={destaqueBox}>
          <Text style={destaqueLabel}>Distância</Text>
          <Text style={destaqueValue}>{distancia} km</Text>
        </View>
        <View style={statDivider} />
        <View style={destaqueBox}>
          <Text style={destaqueLabel}>Vel. Média</Text>
          <Text style={destaqueValue}>{velocidadeMedia}</Text>
        </View>
      </View>
      {observacao ? <Text style={observacaoText}>{observacao}</Text> : null}
    </View>
  );
};

RegistroAerobico.propTypes = {
  registroData: PropTypes.object.isRequired,
};

export default RegistroAerobico;
