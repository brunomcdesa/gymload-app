import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import SelectableItem from '../../../components/Selectable/SelectableItem/SelectableItem';
import style from './styles/style';
import UsuarioDetalhesModal from './UsuarioDetalhesModal';

const Usuario = (props) => {
  const { item, navigation } = props;
  const {
    elementContainer,
    userInfoContainer,
    avatar,
    avatarLetter,
    textContainer,
    userInfoName,
    userEmail,
  } = style;

  const [modalVisible, setModalVisible] = useState(false);

  const redirectToUsuarioEdicaoForm = () => {
    navigation.navigate('UsuarioEdicaoForm', { usuario: item });
  };

  const getOptions = (usuario) => {
    return ['Detalhar Usuário', 'Editar Usuário', 'Cancelar'];
  };

  const selectOptionsAction = (selectedIndex) => {
    switch (selectedIndex) {
      case 0:
        setModalVisible(true);
        break;
      case 1:
        redirectToUsuarioEdicaoForm();
        break;
      case 3:
        break;
    }
  };

  return (
    <View style={elementContainer}>
      <SelectableItem
        item={item}
        cancelButtonIndex={2}
        options={getOptions(item)}
        onActionSelected={selectOptionsAction}
        onLongPress={() => setModalVisible(true)}
      >
        <View style={userInfoContainer}>
          <View style={avatar}>
            <Text style={avatarLetter}>{item.nome?.[0].toUpperCase()}</Text>
          </View>

          <View style={textContainer}>
            <Text style={userInfoName}>{item.nome}</Text>
            <Text style={userEmail}>{item.email}</Text>
          </View>
        </View>
      </SelectableItem>
      <UsuarioDetalhesModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        usuario={item}
      />
    </View>
  );
};

Usuario.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Usuario;
