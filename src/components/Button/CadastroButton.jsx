import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import style from './style/style';

const CadastroButton = (props) => {
  const { cadastroButtonStyle, textStyle } = style;
  return (
    <TouchableOpacity style={cadastroButtonStyle} onPress={props.onPress}>
      <Text style={textStyle}>{props.text}</Text>
    </TouchableOpacity>
  );
};

CadastroButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
export default CadastroButton;
