import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { throwToastError } from '../../../modules/utils/toastUtils';
import CustomCamera from '../../Camera/CustomCamera';
import ImagemUsuario from '../../Imagem/ImagemUsuario';
import CustomImagePickerModal from './CustomImagePickerModal';

const SelectableImage = (props) => {
  const { uriImagemUsuario, setUriImagemUsuario } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);

  const pickImage = async () => {
    setModalVisible(false);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      throwToastError(
        'Permissão necessária! Precisamos da permissão para acessar suas fotos!',
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUriImagemUsuario(result.assets[0].uri);
    }
  };

  const handleTakePhoto = (uri) => {
    setUriImagemUsuario(uri);
    setCameraVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <ImagemUsuario uriImagemUsuario={uriImagemUsuario} isCadastro={true} />
      </TouchableOpacity>

      <CustomImagePickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onTakePhoto={() => {
          setModalVisible(false);
          setCameraVisible(true);
        }}
        onPickImage={pickImage}
      />

      <CustomCamera
        visible={cameraVisible}
        onClose={() => setCameraVisible(false)}
        onPictureTaken={handleTakePhoto}
        pickFromGallery={pickImage}
      />
    </>
  );
};

SelectableImage.propTypes = {
  uriImagemUsuario: PropTypes.string,
  setUriImagemUsuario: PropTypes.func,
};

export default SelectableImage;
