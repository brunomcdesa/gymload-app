import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import style from './style/style';

const BackButton = (props) => {
  const { backButtonStyle, textStyle } = style;
  return (
    <TouchableOpacity
      style={backButtonStyle}
      onPress={props.navigation.goBack}
      activeOpacity={0.7}
    >
      <Text style={textStyle}>Voltar</Text>
    </TouchableOpacity>
  );
};

BackButton.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default BackButton;
