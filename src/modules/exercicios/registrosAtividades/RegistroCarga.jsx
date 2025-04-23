import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../../components/Styles/ComumStyles';
import style from './style/style';

const RegistroCarga = (props) => {
  const { registroData } = props;
  const { qtdSeries, carga, qtdRepeticoes } = registroData;
  const { registroContainer, dataContainer, dataText, divider } = style;

  return (
    <View style={registroContainer}>
      <View style={dataContainer}>
        <MaterialIcons name="replay" size={20} color={colors.secondary} />
        <Text style={dataText}>{qtdSeries}x</Text>
      </View>

      <View style={divider} />

      <View style={dataContainer}>
        <FontAwesome5 name="dumbbell" size={16} color={colors.secondary} />
        <Text style={dataText}>{carga}</Text>
      </View>

      <View style={divider} />

      <View style={dataContainer}>
        <MaterialIcons name="repeat" size={20} color={colors.secondary} />
        <Text style={dataText}>{qtdRepeticoes} reps</Text>
      </View>
    </View>
  );
};

RegistroCarga.propTypes = {
  registroData: PropTypes.object.isRequired,
};

export default RegistroCarga;
