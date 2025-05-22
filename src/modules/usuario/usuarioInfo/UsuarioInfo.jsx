import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import ImagemUsuario from '../../../components/Imagem/ImagemUsuario';
import { ComumStyles } from '../../../components/Styles/ComumStyles';

const UsuarioInfo = (props) => {
  const { userInfoContainer, userInfoName } = ComumStyles;
  const { usuarioNome, uriImagemUsuario } = props;

  return (
    <View style={userInfoContainer}>
      <ImagemUsuario uriImagemUsuario={uriImagemUsuario} isCadastro={false} />
      <Text style={userInfoName}>{usuarioNome}</Text>
    </View>
  );
};

UsuarioInfo.propTypes = {
  usuarioNome: PropTypes.string,
  uriImagemUsuario: PropTypes.string,
};

export default UsuarioInfo;
