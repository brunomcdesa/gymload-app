import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import BackButton from '../../../../components/Button/BackButton';
import SaveButton from '../../../../components/Button/SaveButton';
import ShowPasswordButton from '../../../../components/Button/ShowPasswordButton';
import TextoInput from '../../../../components/Inputs/TextoInput';
import { ComumStyles } from '../../../../components/Styles/ComumStyles';
import { throwToastError, throwToastSuccess } from '../../../utils/toastUtils';
import * as Api from '../../Api';
import style from '../style/style';

const UsuarioCadastroForm = (props) => {
  const {
    title,
    botoesContainer,
    formContainer,
    formLabel,
    passwordContainer,
  } = ComumStyles;
  const { navigation, route } = props;
  const { isCadastroAdmin } = route.params;
  const [formData, setFormData] = useState({
    nome: null,
    username: null,
    password: null,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [uriImagemUsuario, setUriImagemUsuario] = useState(null);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      throwToastError(
        'Permissão necessária! Precisamos da permissão para acessar suas fotos!',
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setUriImagemUsuario(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      throwToastError(
        'Permissão necessária! Precisamos da permissão para acessar sua câmera!',
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setUriImagemUsuario(result.assets[0].uri);
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      'Adicionar Foto',
      'Como você deseja adicionar sua foto de perfil?',
      [
        {
          text: 'Tirar Foto',
          onPress: takePhoto,
        },
        {
          text: 'Escolher da Galeria',
          onPress: pickImage,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
    );
  };

  const handleSubmit = async () => {
    if (!formData.nome || !formData.username || !formData.password) {
      throwToastError('Todos os campos são obrigatórios');
      return;
    }

    try {
      setLoading(true);
      if (isCadastroAdmin) {
        await Api.cadastrarUsuarioAdmin(formData);
      } else {
        console.log('avatar: ', uriImagemUsuario);
        await Api.cadastrarUsuario(formData, uriImagemUsuario);
      }

      throwToastSuccess('Usuário cadastrado com sucesso!');
      navigation.goBack();
    } catch (error) {
      throwToastError('Erro ao cadastrar usuário.');
      console.log('Erro ao cadastrar usuário', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={formContainer}>
      {!isCadastroAdmin && <Text style={title}>Cadastrar-se</Text>}

      {!isCadastroAdmin && (
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity onPress={showImagePickerOptions}>
            <Image
              source={
                uriImagemUsuario
                  ? { uri: uriImagemUsuario }
                  : '../../../../../assets/icon.png'
              }
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: '#ccc',
              }}
            />
          </TouchableOpacity>
          <Text style={{ marginTop: 5, color: '#666' }}>
            Toque para adicionar foto
          </Text>
        </View>
      )}

      <Text style={formLabel}>Nome:</Text>
      <TextoInput
        placeholder="Digite o nome"
        value={formData.nome}
        onChangeText={(nomeValue) => handleChange('nome', nomeValue)}
      />

      <View>
        <Text style={formLabel}>Username:</Text>
        <TextoInput
          placeholder="Digite o username"
          value={formData.username}
          onChangeText={(usernameValue) =>
            handleChange('username', usernameValue)
          }
        />
        <Text style={style.infoText}>
          Será utilizado para realizar o login.
        </Text>
      </View>

      <Text style={formLabel}>Senha:</Text>
      <View style={passwordContainer}>
        <TextoInput
          placeholder="Digite a senha"
          value={formData.password}
          onChangeText={(passwordValue) =>
            handleChange('password', passwordValue)
          }
          secureTextEntry={!showPassword}
        />
        <ShowPasswordButton
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </View>

      <View style={botoesContainer}>
        <BackButton onPress={navigation.goBack} />
        <SaveButton onPress={handleSubmit} loading={loading} />
      </View>
    </View>
  );
};

UsuarioCadastroForm.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      isCadastroAdmin: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UsuarioCadastroForm;
