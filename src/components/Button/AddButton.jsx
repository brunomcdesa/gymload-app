import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import style from './style/style';

const AddButton = (props) => {
  const { AddButtonStyle, TextStyle } = style;
  return (
    <TouchableOpacity
      style={AddButtonStyle}
      onPress={props.onPress}
      activeOpacity={0.7}
    >
      <Text style={TextStyle}>Adicionar</Text>
    </TouchableOpacity>
  );
};

AddButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default AddButton;
