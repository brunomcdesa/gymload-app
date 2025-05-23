import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { Button, Modal, Text, TouchableOpacity, View } from 'react-native';
import { throwToastError } from '../../modules/utils/toastUtils';
import { colors } from '../Styles/ComumStyles';
import style from './styles/style';

const CustomCamera = (props) => {
  const { visible, onClose, onPictureTaken } = props;
  const {
    permissionContainer,
    permissionText,
    closeButton,
    closeButtonText,
    container,
    captureButton,
    camera,
    button,
    controlsRow,
    topControls,
    bottomControls,
  } = style;
  const [facing, setFacing] = useState('front');
  const [flashMode, setFlashMode] = useState('off');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
        <View style={permissionContainer}>
          <Text style={permissionText}>
            Precisamos da sua permissão para usar a câmera
          </Text>
          <Button onPress={requestPermission} title="Conceder Permissão" />
          <TouchableOpacity onPress={onClose} style={closeButton}>
            <Text style={closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7,
        });
        onPictureTaken(photo.uri);
        onClose();
      } catch (error) {
        throwToastError('Não foi possível tirar a foto.');
      }
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlashMode((current) => (current === 'off' ? 'on' : 'off'));
  };

  const pickFromGallery = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        throwToastError('Permissão para acessar a galeria é necessária');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        onPictureTaken(result.assets[0].uri);
        onClose();
      }
    } catch (error) {
      throwToastError('Não foi possível selecionar a imagem');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={container}>
        <CameraView
          ref={cameraRef}
          style={camera}
          facing={facing}
          flash={flashMode}
          ratio="1:1"
          mirror={true}
          mute={true}
        >
          <View style={topControls}>
            <TouchableOpacity onPress={onClose} style={button}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFlash} style={button}>
              <Ionicons
                name={flashMode === 'off' ? 'flash-off' : 'flash'}
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          <View style={bottomControls}>
            <View style={controlsRow}>
              <TouchableOpacity onPress={toggleCameraFacing} style={button}>
                <Ionicons
                  name="camera-reverse"
                  size={32}
                  color={colors.textLight}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={takePhoto} style={captureButton} />

              <TouchableOpacity style={button} onPress={pickFromGallery}>
                <Ionicons name="images" size={24} color={colors.textLight} />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </View>
    </Modal>
  );
};

CustomCamera.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPictureTaken: PropTypes.func.isRequired,
};

export default CustomCamera;
