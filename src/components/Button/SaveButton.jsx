import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import LoadingIndicator from '../Loading/LoadingIndicator';
import AnimatedPressable from './AnimatedPressable';
import style from './style/style';

const SaveButton = (props) => {
  const { saveButtonStyle, disabled, textStyle } = style;
  const { onPress, loading } = props;

  return (
    <AnimatedPressable
      style={[saveButtonStyle, loading && disabled]}
      onPress={!loading ? onPress : null}
      disabled={loading}
    >
      {loading ? <LoadingIndicator /> : <Text style={textStyle}>Salvar</Text>}
    </AnimatedPressable>
  );
};

SaveButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SaveButton;
