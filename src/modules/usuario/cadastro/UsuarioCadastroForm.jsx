import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import BackButton from '../../../components/Button/BackButton';
import SaveButton from '../../../components/Button/SaveButton';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';

const UsuarioCadastroForm = (props) => {
  const { Title, Botoes, FormContainer, FormLabel, FormTextInput } =
    ComumStyles;
  const { navigation, route } = props;
  const { isCadastroAdmin } = route.params;
  const [formData, setFormData] = useState({
    nome: null,
    username: null,
    password: null,
  });
  const [loading, setLoading] = useState(false);

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
    <View style={FormContainer}>
      <Text style={Title}>
        Cadastrar Usuário {isCadastroAdmin ? 'Admin' : ''}
      </Text>

      <Text style={FormLabel}>Nome:</Text>
      <TextInput
        style={FormTextInput}
        placeholder="Digite o nome"
        value={formData.nome}
        onChangeText={(nomeValue) => handleChange('nome', nomeValue)}
      />

      <Text style={FormLabel}>username:</Text>
      <TextInput
        style={FormTextInput}
        placeholder="Digite o username"
        value={formData.username}
        onChangeText={(usernameValue) =>
          handleChange('username', usernameValue)
        }
      />

      <Text style={FormLabel}>senha:</Text>
      <TextInput
        style={FormTextInput}
        placeholder="Digite a senha"
        value={formData.password}
        onChangeText={(passwordValue) =>
          handleChange('password', passwordValue)
        }
      />

      <View style={Botoes}>
        <BackButton navigation={navigation} />
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
