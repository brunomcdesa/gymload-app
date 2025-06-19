import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import BackButton from '../../../../components/Button/BackButton';
import SaveButton from '../../../../components/Button/SaveButton';
import ShowPasswordButton from '../../../../components/Button/ShowPasswordButton';
import TextoInput from '../../../../components/Inputs/TextoInput';
import SelectableImage from '../../../../components/Selectable/SelectableImage/SelectableImage';
import { ComumStyles } from '../../../../components/Styles/ComumStyles';
import { throwToastError, throwToastSuccess } from '../../../utils/toastUtils';
import * as Api from '../../Api';
import style from '../style/style';

const UsuarioCadastroForm = (props) => {
  const { title, formContainer, formLabel, passwordContainer } = ComumStyles;
  const {
    adminContainer,
    imagePickerContainer,
    imageDescription,
    botoesContainer,
  } = style;
  const { navigation, route } = props;
  const { isCadastroAdmin } = route.params;
  const [formData, setFormData] = useState({
    nome: null,
    email: null,
    username: null,
    password: null,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [uriImagemUsuario, setUriImagemUsuario] = useState(null);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (
      !formData.nome ||
      !formData.email ||
      !formData.username ||
      !formData.password
    ) {
      throwToastError('Todos os campos são obrigatórios');
      return;
    }

    try {
      setLoading(true);
      if (isCadastroAdmin) {
        await Api.cadastrarUsuarioAdmin(formData);
      } else {
        await Api.cadastrarUsuario(formData, uriImagemUsuario);
      }

      throwToastSuccess('Usuário cadastrado com sucesso!');
      navigation.goBack();
    } catch (error) {
      const errorMessage = error.data?.message || 'Erro ao cadastrar usuário.';
      throwToastError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={formContainer}>
      {!isCadastroAdmin && (
        <View style={adminContainer}>
          <Text style={title}>Cadastrar-se</Text>

          <View style={imagePickerContainer}>
            <SelectableImage
              uriImagemUsuario={uriImagemUsuario}
              setUriImagemUsuario={setUriImagemUsuario}
            />
            <Text style={imageDescription}>Toque para adicionar foto</Text>
          </View>
        </View>
      )}

      <Text style={formLabel}>Nome Completo:</Text>
      <TextoInput
        placeholder="Digite seu nome completo"
        value={formData.nome}
        onChangeText={(nomeValue) => handleChange('nome', nomeValue)}
      />

      <Text style={formLabel}>Email:</Text>
      <TextoInput
        placeholder="Digite seu email"
        value={formData.email}
        onChangeText={(emailValue) => handleChange('email', emailValue)}
      />

      <Text style={formLabel}>Username:</Text>
      <TextoInput
        placeholder="Digite seu username"
        value={formData.username}
        onChangeText={(usernameValue) =>
          handleChange('username', usernameValue)
        }
      />

      <Text style={formLabel}>Senha:</Text>
      <View style={passwordContainer}>
        <TextoInput
          placeholder="Digite sua senha"
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
