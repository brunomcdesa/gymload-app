import PropTypes from 'prop-types';
import React from 'react';
import { Modal, Text, View } from 'react-native';
import AnimatedPressable from '../Button/AnimatedPressable';
import style from './styles/style';

const ConfirmDialog = ({
  visible,
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}) => (
  <Modal
    transparent
    animationType="fade"
    visible={visible}
    onRequestClose={onCancel}
  >
    <View style={style.overlay}>
      <View style={style.card}>
        <Text style={style.title}>{title}</Text>
        <Text style={style.message}>{message}</Text>
        <View style={style.buttonRow}>
          <AnimatedPressable
            testID="dialog-btn-cancelar"
            wrapperStyle={style.buttonWrapper}
            style={style.cancelButton}
            onPress={onCancel}
          >
            <Text style={style.cancelButtonText}>Cancelar</Text>
          </AnimatedPressable>
          <AnimatedPressable
            testID="dialog-btn-confirmar"
            wrapperStyle={style.buttonWrapper}
            style={style.confirmButton}
            onPress={onConfirm}
          >
            <Text style={style.confirmButtonText}>{confirmLabel}</Text>
          </AnimatedPressable>
        </View>
      </View>
    </View>
  </Modal>
);

ConfirmDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmDialog;
