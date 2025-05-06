import React, { useContext, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackButton from '../../../components/Button/BackButton';
import SaveButton from '../../../components/Button/SaveButton';
import { colors, ComumStyles } from '../../../components/Styles/ComumStyles';
import { AuthContext } from '../../../context/AuthProvider';
import { throwToastError } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from './styles/style';

const Perfil = (props) => {
  const { container } = ComumStyles;
  const {
    mainContainer,
    header,
    headerTitle,
    editButton,
    editButtonText,
    cancelButton,
    cancelButtonText,
    infoSection,
    infoItem,
    infoValue,
    infoLabel,
    separator,
    input,
    editingContainer,
    inputUsername,
    buttonContainer,
  } = style;
  const { navigation } = props;
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({
    nome: user.nome,
    username: user.username,
  });

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await Api.editarDadosUsuario(user.uuid, editData);
      setUser((prev) => ({
        ...prev,
        ...editData,
      }));
      setIsEditing(false);
    } catch (error) {
      throwToastError(
        'Erro ao editar dados do usuário. Por favor tente mais tarde.',
      );
      console.log('Erro ao editar dados do usuário.', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[container, mainContainer]}>
      <View style={header}>
        {isEditing ? (
          <View style={editingContainer}>
            <TextInput
              style={input}
              value={editData.nome}
              onChangeText={(text) => handleEditChange('nome', text)}
              placeholder="Digite seu nome"
              placeholderTextColor="#666"
              autoFocus={true}
            />
          </View>
        ) : (
          <Text style={headerTitle}>{editData.nome}</Text>
        )}

        {!isEditing ? (
          <TouchableOpacity
            style={editButton}
            onPress={() => setIsEditing(true)}
          >
            <Icon name="edit" size={20} color={colors.secondary} />
            <Text style={editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={cancelButton}
            onPress={() => setIsEditing(false)}
          >
            <Text style={cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={infoSection}>
        <View style={separator} />

        <View style={infoItem}>
          <Text style={infoLabel}>Username</Text>
          {isEditing ? (
            <View style={editingContainer}>
              <TextInput
                style={inputUsername}
                value={editData.username}
                onChangeText={(text) => handleEditChange('username', text)}
                placeholder="Digite seu username"
                placeholderTextColor="#666"
              />
            </View>
          ) : (
            <Text style={infoValue}>{user.username}</Text>
          )}
        </View>
      </View>

      <View style={buttonContainer}>
        {isEditing ? (
          <SaveButton onPress={handleSave} loading={loading} />
        ) : (
          <BackButton onPress={navigation.goBack} />
        )}
      </View>
    </View>
  );
};

export default Perfil;
