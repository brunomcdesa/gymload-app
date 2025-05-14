import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
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

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
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
        await Api.cadastrarUsuario(formData);
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
