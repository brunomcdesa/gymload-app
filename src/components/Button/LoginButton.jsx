import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import style from './style/style';

const LoginButton = (props) => {
  const { loginButton, textStyle } = style;
  const { onPress } = props;

  return (
    <TouchableOpacity style={loginButton} onPress={onPress}>
      <Text style={textStyle}>Realizar Login</Text>
    </TouchableOpacity>
  );
};

LoginButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default LoginButton;
