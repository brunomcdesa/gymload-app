import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../../components/Styles/ComumStyles';
import style from './style/style';

const RegistroCardio = (props) => {
  const { registroContainer, dataContainer, divider, dataText } = style;
  const { registroData } = props;
  const { distancia, duracao, velocidadeMedia } = registroData;

  return (
    <View style={registroContainer}>
      <View style={dataContainer}>
        <MaterialCommunityIcons
          name="clock-outline"
          size={20}
          color={colors.secondary}
        />
        <Text style={dataText}>{duracao} h</Text>
      </View>

      <View style={divider} />

      <View style={dataContainer}>
        <MaterialCommunityIcons
          name="map-marker-distance"
          size={20}
          color={colors.secondary}
        />
        <Text style={dataText}>{`${distancia} km`}</Text>
      </View>

      <View style={divider} />

      <View style={dataContainer}>
        <MaterialIcons name="speed" size={20} color={colors.secondary} />
        <Text style={dataText}>{velocidadeMedia}</Text>
      </View>
    </View>
  );
};

RegistroCardio.propTypes = {
  registroData: PropTypes.object.isRequired,
};
export default RegistroCardio;
