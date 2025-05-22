import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { throwToastError } from '../../modules/utils/toastUtils';
import ImagemUsuario from '../Imagem/ImagemUsuario';

const SelectableImage = (props) => {
  const { uriImagemUsuario, setUriImagemUsuario } = props;

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      throwToastError(
        'Permissão necessária! Precisamos da permissão para acessar suas fotos!',
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setUriImagemUsuario(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      throwToastError(
        'Permissão necessária! Precisamos da permissão para acessar sua câmera!',
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setUriImagemUsuario(result.assets[0].uri);
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      'Adicionar Foto',
      'Como você deseja adicionar sua foto de perfil?',
      [
        {
          text: 'Tirar Foto',
          onPress: takePhoto,
        },
        {
          text: 'Escolher da Galeria',
          onPress: pickImage,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <TouchableOpacity onPress={showImagePickerOptions}>
      <ImagemUsuario uriImagemUsuario={uriImagemUsuario} isCadastro={true} />
    </TouchableOpacity>
  );
};

SelectableImage.propTypes = {
  uriImagemUsuario: PropTypes.string,
  setUriImagemUsuario: PropTypes.func,
};

export default SelectableImage;
