import PropTypes from 'prop-types';
import React from 'react';
import { Button, View } from 'react-native';
import style from './style/style';

const SaveButton = (props) => {
  return (
    <View style={style.AddButton}>
      <Button title="Salvar" onPress={props.onPress} />
    </View>
  );
};

SaveButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default SaveButton;
