import PropTypes from 'prop-types';
import React from 'react';
import { Button, View } from 'react-native';

const BackButton = (props) => {
  return (
    <View>
      <Button
        title="Voltar"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
    </View>
  );
};

BackButton.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default BackButton;
