import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LoadingIndicator from '../Loading/LoadingIndicator';
import style from './style/style';

const SaveButton = (props) => {
  const { saveButtonStyle, disabled, textStyle } = style;
  const { onPress, loading } = props;

  return (
    <TouchableOpacity
      style={[saveButtonStyle, loading && disabled]}
      onPress={!loading ? onPress : null}
      disabled={loading}
      activeOpacity={0.7}
    >
      {loading ? <LoadingIndicator /> : <Text style={textStyle}>Salvar</Text>}
    </TouchableOpacity>
  );
};

SaveButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SaveButton;
