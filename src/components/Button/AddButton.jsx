import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import style from './style/style';

const AddButton = (props) => {
  const { circularAddButton, addIcon } = style;
  const { onPress } = props;
  return (
    <TouchableOpacity
      style={circularAddButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={addIcon}>+</Text>
    </TouchableOpacity>
  );
};

AddButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default AddButton;
