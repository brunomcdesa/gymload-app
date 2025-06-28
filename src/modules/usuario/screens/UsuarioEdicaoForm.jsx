import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import BackButton from '../../../components/Button/BackButton';
import SaveButton from '../../../components/Button/SaveButton';
import TextoInput from '../../../components/Inputs/TextoInput';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import style from './styles/style';

const UsuarioEdicaoForm = (props) => {
  const { title, formContainer, formLabel, passwordContainer } = ComumStyles;
  const {
    cadastroFormAdminContainer,
    cadastroFormImagePickerContainer,
    cadastroFormiImageDescription,
    cadastroFormBotoesContainer,
  } = style;
  const { navigation, route } = props;
  const { usuario } = route.params;
  const [formData, setFormData] = useState({
    nome: usuario.nome,
    email: usuario.email,
    username: usuario.username,
    idade: usuario.idade,
    pesoCorporal: usuario.pesoCorporal,
    altura: usuario.altura,
    sexo: usuario.sexo,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      throwToastSuccess('Usuário editado com sucesso!');
      navigation.goBack();
    } catch (error) {
      const errorMessage = error.data?.message || 'Erro ao editar usuário.';
      throwToastError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={formContainer}>
      <View style={cadastroFormAdminContainer}>
        <Text style={title}>Editar Usuário</Text>
      </View>

      <Text style={formLabel}>Nome Completo:</Text>
      <TextoInput
        placeholder="Digite o nome completo"
        value={formData.nome}
        onChangeText={(nomeValue) => handleChange('nome', nomeValue)}
      />

      <Text style={formLabel}>Email:</Text>
      <TextoInput
        placeholder="Digite o email"
        value={formData.email}
        onChangeText={(emailValue) => handleChange('email', emailValue)}
      />

      <Text style={formLabel}>Username:</Text>
      <TextoInput
        placeholder="Digite o username"
        value={formData.username}
        onChangeText={(usernameValue) =>
          handleChange('username', usernameValue)
        }
      />

      <Text style={formLabel}>Idade:</Text>
      <TextoInput
        placeholder="Digite a idade"
        value={formData.idade}
        keyboardType="numeric"
        onChangeText={(idadeValue) => handleChange('idade', idadeValue)}
      />

      <Text style={formLabel}>Peso Corporal:</Text>
      <TextoInput
        placeholder="Digite o peso corporal"
        value={formData.pesoCorporal}
        keyboardType="numeric"
        onChangeText={(pesoCorporalValue) =>
          handleChange('pesoCorporal', pesoCorporalValue)
        }
      />

      <Text style={formLabel}>Altura:</Text>
      <TextoInput
        placeholder="Digite a altura"
        value={formData.altura}
        keyboardType="numeric"
        onChangeText={(alturaValue) => handleChange('altura', alturaValue)}
      />

      <Text style={formLabel}>Sexo:</Text>
      <TextoInput
        placeholder="Selecione o sexo"
        value={formData.sexo}
        onChangeText={(sexoValue) => handleChange('sexo', sexoValue)}
      />

      <View style={cadastroFormBotoesContainer}>
        <BackButton onPress={navigation.goBack} />
        <SaveButton onPress={handleSubmit} loading={loading} />
      </View>
    </View>
  );
};

UsuarioEdicaoForm.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      isCadastroAdmin: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UsuarioEdicaoForm;
