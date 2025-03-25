import React from 'react';
import { Text } from 'react-native';

const UsuarioInfo = (props) => {
  return (
    <Text style={{ color: '#fff', fontSize: 18 }}>Olá, {props.userName}</Text>
  );
};

export default UsuarioInfo;
