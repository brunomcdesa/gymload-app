import PropTypes from 'prop-types';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import style from './styles/style';

const UsuarioDetalhesModal = (props) => {
  const { isVisible, onClose, usuario } = props;
  const {
    modalOverlay,
    modalView,
    modalTitle,
    detailRow,
    detailLabel,
    detailValue,
    closeButton,
    closeButtonText,
  } = style;

  if (!isVisible || !usuario) {
    return null;
  }

  const renderDetail = (value, unit = '') => {
    return value ? `${value}${unit}` : 'Não Informado';
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <View style={modalOverlay}>
        <View style={modalView}>
          <Text style={modalTitle}>Detalhes do Usuário</Text>

          <View style={detailRow}>
            <Text style={detailLabel}>Nome</Text>
            <Text style={detailValue}>{renderDetail(usuario.nome)}</Text>
          </View>

          <View style={detailRow}>
            <Text style={detailLabel}>Idade</Text>
            <Text style={detailValue}>
              {renderDetail(usuario.idade, ' anos')}
            </Text>
          </View>

          <View style={detailRow}>
            <Text style={detailLabel}>Sexo</Text>
            <Text style={detailValue}>{renderDetail(usuario.sexo)}</Text>
          </View>

          <View style={detailRow}>
            <Text style={detailLabel}>Altura</Text>
            <Text style={detailValue}>
              {renderDetail(usuario.altura, ' m')}
            </Text>
          </View>

          <View style={detailRow}>
            <Text style={detailLabel}>Peso</Text>
            <Text style={detailValue}>{renderDetail(usuario.peso, ' kg')}</Text>
          </View>

          <TouchableOpacity style={closeButton} onPress={onClose}>
            <Text style={closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

UsuarioDetalhesModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  usuario: PropTypes.object.isRequired,
};

export default UsuarioDetalhesModal;
