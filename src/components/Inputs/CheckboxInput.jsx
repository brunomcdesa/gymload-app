import Checkbox from '@react-native-community/checkbox';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { colors, ComumStyles } from '../Styles/ComumStyles';
import style from './styles/style';

const CHeckboxInput = (props) => {
  const { checkboxContainer } = style;
  const { formLabel } = ComumStyles;
  const { secondary, terciary } = colors;
  const { value, onChangeValue, label } = props;

  return (
    <View style={checkboxContainer}>
      <Checkbox
        value={value}
        onValueChange={onChangeValue}
        tintColors={{ true: secondary, false: terciary }}
      />
      <Text style={formLabel}>{label}</Text>
    </View>
  );
};

CHeckboxInput.propTypes = {
  value: PropTypes.bool.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default CHeckboxInput;
