import { Ionicons } from '@expo/vector-icons'; // Usando Ionicons como exemplo
import React from 'react';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../Styles/ComumStyles'; // Importe suas cores
import style from './style/style';

const HeaderBackButton = (props) => {
  const { onPress } = props;
  const { backButtonStyle } = style;

  return (
    <TouchableOpacity onPress={onPress} style={backButtonStyle}>
      <Ionicons name="arrow-back" size={26} color={colors.secondary} />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;
