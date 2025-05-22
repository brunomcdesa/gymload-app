import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import userDefaultImage from './assets/user-default.png';
import style from './styles/style';

const ImagemUsuario = (props) => {
  const { imageContainer, imageSizeBig, imageSizeSmall } = style;
  const { uriImagemUsuario, isCadastro } = props;

  return (
    <Image
      source={uriImagemUsuario ? { uri: uriImagemUsuario } : userDefaultImage}
      style={[imageContainer, isCadastro ? imageSizeBig : imageSizeSmall]}
    />
  );
};

ImagemUsuario.propTypes = {
  uriImagemUsuario: PropTypes.string,
  isCadastro: PropTypes.bool,
};

export default ImagemUsuario;
