import PropTypes from 'prop-types';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Text, View } from 'react-native';
import SaveButton from '../../../components/Button/SaveButton';
import ShowPasswordButton from '../../../components/Button/ShowPasswordButton';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import TextoInput from '../../../components/Inputs/TextoInput';
import SelectableImage from '../../../components/Selectable/SelectableImage/SelectableImage';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from './styles/style';

const UsuarioCadastroForm = (props) => {
  const {
    fabContainer,
    formContainer,
    formLabel,
    passwordContainer,
    formLabelObrigatorio,
    asteriscoObrigatorio,
  } = ComumStyles;
  const {
    cadastroFormAdminContainer,
    cadastroFormImagePickerContainer,
    cadastroFormiImageDescription,
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

  const renderHeaderTitle = useCallback(() => {
    return (
      <HeaderTitle
        title={!isCadastroAdmin ? 'Cadastrar-se' : 'Cadastre um novo Admin'}
        isForm={true}
      />
    );
  }, [isCadastroAdmin]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
    });
  }, [navigation, renderHeaderTitle]);

  return (
    <View style={formContainer}>
      {!isCadastroAdmin && (
        <View style={cadastroFormAdminContainer}>
          <View style={cadastroFormImagePickerContainer}>
            <SelectableImage
              uriImagemUsuario={uriImagemUsuario}
              setUriImagemUsuario={setUriImagemUsuario}
            />
            <Text style={cadastroFormiImageDescription}>
              Toque para adicionar foto
            </Text>
          </View>
        </View>
      )}

      <View style={formLabelObrigatorio}>
        <Text style={formLabel}>Nome Completo</Text>
        <Text style={asteriscoObrigatorio}>*</Text>
      </View>
      <TextoInput
        placeholder="Digite seu nome completo"
        value={formData.nome}
        onChangeText={(nomeValue) => handleChange('nome', nomeValue)}
      />

      <View style={formLabelObrigatorio}>
        <Text style={formLabel}>Email</Text>
        <Text style={asteriscoObrigatorio}>*</Text>
      </View>
      <TextoInput
        placeholder="Digite seu email"
        value={formData.email}
        onChangeText={(emailValue) => handleChange('email', emailValue)}
      />

      <View style={formLabelObrigatorio}>
        <Text style={formLabel}>Username</Text>
        <Text style={asteriscoObrigatorio}>*</Text>
      </View>
      <TextoInput
        placeholder="Digite seu username"
        value={formData.username}
        onChangeText={(usernameValue) =>
          handleChange('username', usernameValue)
        }
      />

      <View style={formLabelObrigatorio}>
        <Text style={formLabel}>Senha</Text>
        <Text style={asteriscoObrigatorio}>*</Text>
      </View>
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

      <View style={fabContainer}>
        <SaveButton onPress={handleSubmit} loading={loading} />
      </View>
    </View>
  );
};

UsuarioCadastroForm.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      isCadastroAdmin: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UsuarioCadastroForm;
