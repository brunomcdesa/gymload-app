import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import style from './styles/style';

const UsuarioInfo = (props) => {
  const { usuarioNomeStyle } = style;
  return <Text style={usuarioNomeStyle}>{props.usuarioNome}</Text>;
};

UsuarioInfo.propTypes = {
  usuarioNome: PropTypes.string.isRequired,
};

export default UsuarioInfo;
