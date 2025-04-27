import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import style from './style/style';

const AddButton = (props) => {
  const { addButtonStyle, textStyle } = style;
  const { onPress, text } = props;
  return (
    <TouchableOpacity
      style={addButtonStyle}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={textStyle}>{text || 'Adicionar'}</Text>
    </TouchableOpacity>
  );
};

AddButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export default AddButton;
