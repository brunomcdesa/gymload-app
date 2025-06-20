import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackButton from '../../../components/Button/BackButton';
import SaveButton from '../../../components/Button/SaveButton';
import ImagemUsuario from '../../../components/Imagem/ImagemUsuario';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import SelectableImage from '../../../components/Selectable/SelectableImage/SelectableImage';
import { colors, ComumStyles } from '../../../components/Styles/ComumStyles';
import { AuthContext } from '../../../context/AuthProvider';
import { throwToastError } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from './styles/style';

const Perfil = (props) => {
  const { container, userInfoContainer, userInfoName } = ComumStyles;
  const {
    mainContainer,
    header,
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
    inputNome,
    infoContainer,
    buttonContainer,
  } = style;
  const { navigation } = props;
  const { user, setUser } = useContext(AuthContext);
  const { imagemPerfilUrl } = user;
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [usuario, setUsuario] = useState({
    uuid: user.uuid,
    nome: null,
    username: null,
    email: null,
    idade: null,
    pesoCorporal: null,
    altura: null,
    sexo: null,
  });
  const [editData, setEditData] = useState({
    nome: null,
    username: null,
    email: null,
    idade: null,
    pesoCorporal: null,
    altura: null,
    sexo: null,
  });
  const [uriImagemUsuario, setUriImagemUsuario] = useState(imagemPerfilUrl);

  const fetchDadosUsuario = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchDadosUsuarioLogado();
      setUsuario({
        nome: data.nome,
        username: data.username,
        email: data.email,
        idade: data.idade,
        pesoCorporal: data.pesoCorporal,
        altura: data.altura,
        sexo: data.sexo,
      });
      setEditData({
        nome: data.nome,
        username: data.username,
        email: data.email,
        idade: data.idade,
        pesoCorporal: data.pesoCorporal,
        altura: data.altura,
        sexo: data.sexo,
      });
    } catch (error) {
      throwToastError(error.data?.message || 'erro ao buscar dados do usuario');
      console.log({ ...error });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaveLoading(true);
      await Api.editarDadosUsuario(user.uuid, editData, uriImagemUsuario);
      const { data } = await Api.fetchUrlImagemPerfil();

      setUser((prev) => ({
        ...prev,
        ...editData,
        imagemPerfilUrl: data,
      }));
      setIsEditing(false);
    } catch (error) {
      throwToastError(error.data.message);
    } finally {
      setSaveLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDadosUsuario();
    }, [fetchDadosUsuario]),
  );

  const renderDadosUsuario = () => {
    return (
      <View>
        <View style={header}>
          {isEditing ? (
            <View style={editingContainer}>
              <SelectableImage
                uriImagemUsuario={uriImagemUsuario}
                setUriImagemUsuario={setUriImagemUsuario}
              />
              <TextInput
                style={inputNome}
                value={editData.nome}
                onChangeText={(text) => handleEditChange('nome', text)}
                placeholder="Digite seu nome"
                placeholderTextColor="#666"
                autoFocus={true}
              />
            </View>
          ) : (
            <View style={userInfoContainer}>
              <ImagemUsuario
                uriImagemUsuario={imagemPerfilUrl}
                isCadastro={false}
              />
              <Text style={userInfoName}>{usuario.nome}</Text>
            </View>
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
                  style={input}
                  value={editData.username}
                  onChangeText={(text) => handleEditChange('username', text)}
                  placeholder="Digite seu username"
                  placeholderTextColor="#666"
                />
              </View>
            ) : (
              <View style={infoContainer}>
                <Text style={infoValue}>{usuario.username}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={infoSection}>
          <View style={separator} />

          <View style={infoItem}>
            <Text style={infoLabel}>Email</Text>
            {isEditing ? (
              <View style={editingContainer}>
                <TextInput
                  style={input}
                  value={editData.email}
                  onChangeText={(text) => handleEditChange('email', text)}
                  placeholder="Digite seu email"
                  placeholderTextColor="#666"
                />
              </View>
            ) : (
              <Text style={infoValue}>{usuario.email}</Text>
            )}
          </View>
        </View>

        <View style={infoSection}>
          <View style={separator} />

          <View style={infoItem}>
            <Text style={infoLabel}>Idade</Text>
            {isEditing ? (
              <View style={editingContainer}>
                <TextInput
                  style={input}
                  value={editData.idade}
                  keyboardType="numeric"
                  onChangeText={(text) => handleEditChange('idade', text)}
                  placeholder="Digite sua idade"
                  placeholderTextColor="#666"
                />
              </View>
            ) : (
              <Text style={infoValue}>
                {usuario.idade ? usuario.idade + 'anos' : 'Não informado'}
              </Text>
            )}
          </View>
        </View>

        <View style={infoSection}>
          <View style={separator} />

          <View style={infoItem}>
            <Text style={infoLabel}>Peso Corporal</Text>
            {isEditing ? (
              <View style={editingContainer}>
                <TextInput
                  style={input}
                  value={editData.pesoCorporal}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    handleEditChange('pesoCorporal', text)
                  }
                  placeholder="Digite seu peso"
                  placeholderTextColor="#666"
                />
              </View>
            ) : (
              <Text style={infoValue}>
                {usuario.pesoCorporal
                  ? usuario.pesoCorporal + 'KG'
                  : 'Não informado'}
              </Text>
            )}
          </View>
        </View>

        <View style={infoSection}>
          <View style={separator} />

          <View style={infoItem}>
            <Text style={infoLabel}>Altura (m)</Text>
            {isEditing ? (
              <View style={editingContainer}>
                <TextInput
                  style={input}
                  value={editData.altura}
                  keyboardType="numeric"
                  onChangeText={(text) => handleEditChange('altura', text)}
                  placeholder="Digite sua altura"
                  placeholderTextColor="#666"
                />
              </View>
            ) : (
              <Text style={infoValue}>
                {usuario.altura ? usuario.altura + 'm' : 'Não informado'}
              </Text>
            )}
          </View>
        </View>

        {/* 
         TROCAR O SEXO PARA QUE SEJA UM SELECT
         */}
        <View style={infoSection}>
          <View style={separator} />

          <View style={infoItem}>
            <Text style={infoLabel}>Sexo</Text>
            {isEditing ? (
              <View style={editingContainer}>
                <TextInput
                  style={input}
                  value={editData.sexo}
                  onChangeText={(text) => handleEditChange('sexo', text)}
                  placeholder="Digite seu sexo"
                  placeholderTextColor="#666"
                />
              </View>
            ) : (
              <Text style={infoValue}>
                {usuario.sexo ? usuario.sexo + 'KG' : 'Não informado'}
              </Text>
            )}
          </View>
        </View>

        <View style={buttonContainer}>
          {isEditing ? (
            <SaveButton onPress={handleSave} loading={saveLoading} />
          ) : (
            <BackButton onPress={navigation.goBack} />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={[container, mainContainer]}>
      {loading ? <LoadingIndicator /> : renderDadosUsuario()}
    </View>
  );
};

Perfil.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default Perfil;
