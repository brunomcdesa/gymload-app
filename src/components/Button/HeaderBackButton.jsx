import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../Styles/ComumStyles';
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

HeaderBackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default HeaderBackButton;
