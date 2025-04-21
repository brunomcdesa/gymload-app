import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import style from './style/style';

const EsqueciMinhaSenhaButton = (props) => {
  const { botaoEsqueciSenha, textoEsqueciSenha } = style;
  const { onPress } = props;
  return (
    <TouchableOpacity style={botaoEsqueciSenha} onPress={onPress}>
      <Text style={textoEsqueciSenha}>Esqueci minha senha</Text>
    </TouchableOpacity>
  );
};

EsqueciMinhaSenhaButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default EsqueciMinhaSenhaButton;
