import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import AnimatedPressable from './AnimatedPressable';
import style from './style/style';

const AddButton = (props) => {
  const { circularAddButton, addIcon } = style;
  const { onPress } = props;
  return (
    <AnimatedPressable style={circularAddButton} onPress={onPress}>
      <Text style={addIcon}>+</Text>
    </AnimatedPressable>
  );
};

AddButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default AddButton;
