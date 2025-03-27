import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import style from './style/style';

const CadastroButton = (props) => {
  const { CadastroButtonStyle, TextStyle } = style;
  return (
    <TouchableOpacity style={CadastroButtonStyle} onPress={props.onPress}>
      <Text style={TextStyle}>{props.text}</Text>
    </TouchableOpacity>
  );
};

CadastroButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
export default CadastroButton;
