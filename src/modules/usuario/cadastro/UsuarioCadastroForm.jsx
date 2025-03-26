import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import BackButton from '../../../components/Button/BackButton';
import SaveButton from '../../../components/Button/SaveButton';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import * as Api from '../Api';

const UsuarioCadastroForm = (props) => {
  const { Title, Botoes, FormContainer, FormLabel, FormTextInput } =
    ComumStyles;
  const { navigation, route } = props;
  const [formData, setFormData] = useState({
    nome: null,
    username: null,
    password: null,
    cadastroAdmin: route.params.isCadastroAdmin,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (!formData.nome || !formData.username || !formData.password) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    try {
      setLoading(true);
      await Api.cadastrarUsuarioAdmin(formData);
      Alert.alert('Sucesso', 'Grupo Muscular salvo com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.log('Erro ao salvar novo histórico de carga', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={FormContainer}>
      <Text style={Title}>Cadastrar Usuário Admin</Text>

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
