import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import style from './style/style';

const BackButton = (props) => {
  const { backButtonStyle, textStyle } = style;
  return (
    <TouchableOpacity
      style={backButtonStyle}
      onPress={props.onPress}
      activeOpacity={0.7}
    >
      <Text style={textStyle}>Voltar</Text>
    </TouchableOpacity>
  );
};

BackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default BackButton;
