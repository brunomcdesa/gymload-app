import PropTypes from 'prop-types';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import style from '../styles/style';

const CustomImagePickerModal = (props) => {
  const { visible, onClose, onTakePhoto, onPickImage } = props;
  const {
    modalOverlay,
    modalContainer,
    modalTitle,
    modalMessage,
    modalButton,
    modalButtonText,
    cancelButton,
  } = style;

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={modalOverlay}>
        <View style={modalContainer}>
          <Text style={modalTitle}>Adicionar Foto</Text>
          <Text style={modalMessage}>
            Como você deseja adicionar sua foto de perfil?
          </Text>

          <TouchableOpacity style={modalButton} onPress={onTakePhoto}>
            <Text style={modalButtonText}>Tirar Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={modalButton} onPress={onPickImage}>
            <Text style={modalButtonText}>Escolher da Galeria</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[modalButton, cancelButton]}
            onPress={onClose}
          >
            <Text style={modalButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

CustomImagePickerModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onTakePhoto: PropTypes.func.isRequired,
  onPickImage: PropTypes.func.isRequired,
};

export default CustomImagePickerModal;
