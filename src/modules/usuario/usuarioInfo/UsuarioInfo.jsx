import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';

const UsuarioInfo = (props) => {
  return (
    <Text style={{ color: '#fff', fontSize: 18 }}>{props.usuarioNome}</Text>
  );
};

UsuarioInfo.propTypes = {
  usuarioNome: PropTypes.string.isRequired,
};

export default UsuarioInfo;
