import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import SelectableItem from '../../../components/Selectable/SelectableItem/SelectableItem';
import style from './styles/style';
import UsuarioDetalhesModal from './UsuarioDetalhesModal';

const Usuario = (props) => {
  const { item } = props;
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

  const getOptions = (usuario) => {
    return ['Detalhar Usuário', 'Editar Usuário', 'Cancelar'];
  };

  const selectOptionsAction = (selectedIndex) => {
    switch (selectedIndex) {
      case 0:
        setModalVisible(true);
        break;
      case 1:
        console.log('Editando Usuário...');
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
        onLongPress={() => {}}
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
  item: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    idade: PropTypes.number,
    sexo: PropTypes.string,
    altura: PropTypes.number,
    peso: PropTypes.number,
  }).isRequired,
};

export default Usuario;
