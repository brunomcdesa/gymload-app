import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { colors } from '../Styles/ComumStyles';
import style from './styles/style';

const TextoInput = (props) => {
  const { placeholder, value, onChangeText, keyboardType, secureTextEntry } =
    props;
  const { formTextInput } = style;
  const { placeholderText, secondary } = colors;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={[formTextInput, isFocused && { borderColor: secondary }]}
      placeholder={placeholder}
      keyboardType={keyboardType || 'default'}
      placeholderTextColor={placeholderText}
      value={value}
      onChangeText={(textValue) => {
        onChangeText(textValue);
      }}
      secureTextEntry={secureTextEntry}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

TextoInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};

export default TextoInput;
