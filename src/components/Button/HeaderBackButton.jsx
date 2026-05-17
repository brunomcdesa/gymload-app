import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import PropTypes from 'prop-types';
import { colors } from '../Styles/ComumStyles';
import AnimatedPressable from './AnimatedPressable';
import style from './style/style';

const HeaderBackButton = (props) => {
  const { onPress } = props;
  const { backButtonStyle } = style;

  return (
    <AnimatedPressable onPress={onPress} style={backButtonStyle}>
      <Ionicons name="arrow-back" size={26} color={colors.secondary} />
    </AnimatedPressable>
  );
};

HeaderBackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default HeaderBackButton;
