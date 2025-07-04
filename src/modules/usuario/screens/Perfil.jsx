import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackButton from '../../../components/Button/HeaderBackButton';
import SaveButton from '../../../components/Button/SaveButton';
import ImagemUsuario from '../../../components/Imagem/ImagemUsuario';
import InfoBlock from '../../../components/Infos/InfoBlock';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import SelectableImage from '../../../components/Selectable/SelectableImage/SelectableImage';
import { AuthContext } from '../../../context/AuthProvider';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from './styles/style';

const Perfil = (props) => {
  const { navigation } = props;
  const { user, setUser } = useContext(AuthContext);
  const {
    mainContainer,
    header,
    headerEditContainer,
    headerViewContainer,
    inputNome,
    userNameText,
    cancelButton,
    editButton,
    cancelButtonText,
    editButtonText,
    card,
    cardTitle,
    separator,
    infoRow,
    genderSelector,
    genderButton,
    genderButtonSelected,
    genderButtonText,
    genderButtonTextSelected,
    actionButtonContainer,
  } = style;

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const [usuario, setUsuario] = useState({
    nome: null,
    username: null,
    email: null,
    idade: null,
    pesoCorporal: null,
    altura: null,
    sexo: null,
  });
  const [editData, setEditData] = useState({});
  const [uriImagemUsuario, setUriImagemUsuario] = useState(
    user.imagemPerfilUrl,
  );

  const fetchDadosUsuario = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchDadosUsuarioLogado();
      const userData = {
        nome: data.nome,
        username: data.username,
        email: data.email,
        idade: data.idade ? String(data.idade) : null,
        pesoCorporal: data.pesoCorporal ? String(data.pesoCorporal) : null,
        altura: data.altura ? String(data.altura) : null,
        sexo: data.sexo || null,
      };
      setUsuario(userData);
      setEditData(userData);
    } catch (error) {
      throwToastError(
        error?.data[0]?.message || 'Erro ao buscar dados do usuário',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchDadosUsuario();
    }, [fetchDadosUsuario]),
  );

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setEditData(usuario);
    setUriImagemUsuario(user.imagemPerfilUrl);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      setSaveLoading(true);
      await Api.editarDadosUsuario(user.uuid, editData, uriImagemUsuario);
      const { data } = await Api.fetchUrlImagemPerfil();

      const updatedUser = { ...user, ...editData, imagemPerfilUrl: data };
      setUser(updatedUser);
      setUsuario(editData);

      setIsEditing(false);
      throwToastSuccess('Usuário atualizado com sucesso');
    } catch (error) {
      throwToastError(
        error?.data[0]?.message || 'Erro ao atualizar informações do usuário.',
      );
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={mainContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <ScrollView
      style={mainContainer}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <View style={header}>
        {isEditing ? (
          <View style={headerEditContainer}>
            <SelectableImage
              uriImagemUsuario={uriImagemUsuario}
              setUriImagemUsuario={setUriImagemUsuario}
            />
            <TextInput
              style={inputNome}
              value={editData.nome}
              onChangeText={(text) => handleEditChange('nome', text)}
              placeholder="Seu Nome"
              placeholderTextColor="#666"
            />
          </View>
        ) : (
          <View style={headerViewContainer}>
            <ImagemUsuario
              uriImagemUsuario={uriImagemUsuario}
              isCadastro={false}
            />
            <Text style={userNameText}>{usuario.nome}</Text>
          </View>
        )}
        <TouchableOpacity
          onPress={() => (isEditing ? handleCancel() : setIsEditing(true))}
        >
          <View style={isEditing ? cancelButton : editButton}>
            {!isEditing && (
              <Icon name="edit" size={20} color={editButtonText.color} />
            )}
            <Text style={isEditing ? cancelButtonText : editButtonText}>
              {isEditing ? 'Cancelar' : 'Editar Perfil'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={card}>
        <Text style={cardTitle}>Informações da Conta</Text>

        <View style={infoRow}>
          <InfoBlock
            icon="person"
            label="Username"
            value={editData.username}
            isEditing={isEditing}
            onChangeText={handleEditChange}
            placeholder="Seu username"
            field="username"
          />

          <InfoBlock
            icon="email"
            label="Email"
            value={editData.email}
            isEditing={isEditing}
            onChangeText={handleEditChange}
            placeholder="Seu email"
            keyboardType="email-address"
            field="email"
          />
        </View>

        <View style={separator} />

        <View style={infoRow}>
          <InfoBlock
            icon="cake"
            label="Idade"
            value={
              !isEditing && editData.idade
                ? `${editData.idade} anos`
                : editData.idade
            }
            isEditing={isEditing}
            onChangeText={handleEditChange}
            placeholder="Sua idade"
            keyboardType="numeric"
            field="idade"
          />
          <InfoBlock
            icon="fitness-center"
            label="Peso"
            value={
              !isEditing && editData.pesoCorporal
                ? `${editData.pesoCorporal} kg`
                : editData.pesoCorporal
            }
            isEditing={isEditing}
            onChangeText={handleEditChange}
            placeholder="Seu peso"
            keyboardType="numeric"
            field="pesoCorporal"
          />
        </View>

        <View style={separator} />

        <View style={infoRow}>
          <InfoBlock
            icon="height"
            label="Altura"
            value={
              !isEditing && editData.altura
                ? `${editData.altura} m`
                : editData.altura
            }
            isEditing={isEditing}
            onChangeText={handleEditChange}
            placeholder="Ex: 1.75"
            keyboardType="numeric"
            field="altura"
          />
          <InfoBlock
            icon="wc"
            label="Sexo"
            value={editData.sexo}
            isEditing={isEditing}
          >
            {isEditing && (
              <View style={genderSelector}>
                <TouchableOpacity
                  style={[
                    genderButton,
                    editData.sexo === 'MASCULINO' && genderButtonSelected,
                  ]}
                  onPress={() => handleEditChange('sexo', 'MASCULINO')}
                >
                  <Text
                    style={[
                      genderButtonText,
                      editData.sexo === 'MASCULINO' && genderButtonTextSelected,
                    ]}
                  >
                    M
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    genderButton,
                    editData.sexo === 'FEMININO' && genderButtonSelected,
                  ]}
                  onPress={() => handleEditChange('sexo', 'FEMININO')}
                >
                  <Text
                    style={[
                      genderButtonText,
                      editData.sexo === 'FEMININO' && genderButtonTextSelected,
                    ]}
                  >
                    F
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </InfoBlock>
        </View>
      </View>

      <View style={actionButtonContainer}>
        {isEditing ? (
          <SaveButton onPress={handleSave} loading={saveLoading} />
        ) : (
          <BackButton onPress={navigation.goBack} />
        )}
      </View>
    </ScrollView>
  );
};

Perfil.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default Perfil;
