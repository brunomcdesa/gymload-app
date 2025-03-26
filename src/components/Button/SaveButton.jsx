import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LoadingIndicator from '../Loading/LoadingIndicator';
import style from './style/style';

const SaveButton = (props) => {
  const { SaveButtonStyle, Disabled, TextStyle } = style;
  const { onPress, loading } = props;

  return (
    <TouchableOpacity
      style={[SaveButtonStyle, loading && Disabled]}
      onPress={!loading ? onPress : null}
      disabled={loading}
      activeOpacity={0.7}
    >
      {loading ? <LoadingIndicator /> : <Text style={TextStyle}>Salvar</Text>}
    </TouchableOpacity>
  );
};

SaveButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SaveButton;
