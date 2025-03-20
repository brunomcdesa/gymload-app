import PropTypes from 'prop-types';
import React from 'react';
import { Button, View } from 'react-native';
import style from './style/style';

const AddButton = (props) => {
  return (
    <View style={style.AddButton}>
      <Button title="Adicionar" onPress={props.onPress} />
    </View>
  );
};

AddButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default AddButton;
