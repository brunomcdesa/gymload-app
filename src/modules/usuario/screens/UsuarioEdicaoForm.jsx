import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import BackButton from '../../../components/Button/HeaderBackButton';
import SaveButton from '../../../components/Button/SaveButton';
import TextoInput from '../../../components/Inputs/TextoInput';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from './styles/style';

const UsuarioEdicaoForm = (props) => {
  const { navigation, route } = props;
  const { usuario } = route.params;
  const {
    formContainer,
    formLabel,
    inlineContainer,
    inputGroup,
    title,
    scrollContentContainer,
  } = ComumStyles;
  const {
    botoesContainer,
    fieldContainer,
    genderButton,
    genderButtonSelected,
    genderButtonText,
    genderButtonTextSelected,
    genderSelector,
  } = style;

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
      await Api.editarDadosUsuario(usuario.uuid, formData);

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
      <ScrollView contentContainerStyle={scrollContentContainer}>
        <View style={fieldContainer}>
          <Text style={title}>Editar Usuário</Text>

          <Text style={formLabel}>Nome Completo</Text>
          <TextoInput
            placeholder="Digite o nome completo"
            value={formData.nome}
            onChangeText={(nomeValue) => handleChange('nome', nomeValue)}
          />
        </View>

        <View style={fieldContainer}>
          <Text style={formLabel}>Email</Text>
          <TextoInput
            placeholder="Digite o email"
            value={formData.email}
            onChangeText={(emailValue) => handleChange('email', emailValue)}
            type="email"
          />
        </View>

        <View style={fieldContainer}>
          <Text style={formLabel}>Username</Text>
          <TextoInput
            placeholder="Digite o username"
            value={formData.username}
            onChangeText={(usernameValue) =>
              handleChange('username', usernameValue)
            }
          />
        </View>

        <View style={inlineContainer}>
          <View style={inputGroup}>
            <Text style={formLabel}>Idade</Text>
            <TextoInput
              placeholder="Ex: 25"
              value={formData.idade?.toString() || ''}
              onChangeText={(idadeValue) => handleChange('idade', idadeValue)}
              type="number"
            />
          </View>
          <View style={inputGroup}>
            <Text style={formLabel}>Peso (kg)</Text>
            <TextoInput
              placeholder="Ex: 75.5"
              value={formData.pesoCorporal?.toString() || ''}
              onChangeText={(pesoValue) =>
                handleChange('pesoCorporal', pesoValue)
              }
              type="number"
              step="0.1"
            />
          </View>
        </View>

        <View style={inlineContainer}>
          <View style={inputGroup}>
            <Text style={formLabel}>Altura (m)</Text>
            <TextoInput
              placeholder="Ex: 1.75"
              value={formData.altura?.toString() || ''}
              onChangeText={(alturaValue) =>
                handleChange('altura', alturaValue)
              }
              type="number"
              step="0.01"
            />
          </View>
          <View style={inputGroup}>
            <Text style={formLabel}>Sexo:</Text>
            <View style={genderSelector}>
              <TouchableOpacity
                style={{
                  ...genderButton,
                  ...(formData.sexo === 'MASCULINO' && genderButtonSelected),
                }}
                onPress={() => handleChange('sexo', 'MASCULINO')}
              >
                <Text
                  style={{
                    ...genderButtonText,
                    ...(formData.sexo === 'MASCULINO' &&
                      genderButtonTextSelected),
                  }}
                >
                  M
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...genderButton,
                  ...(formData.sexo === 'FEMININO' && genderButtonSelected),
                }}
                onPress={() => handleChange('sexo', 'FEMININO')}
              >
                <Text
                  style={{
                    ...genderButtonText,
                    ...(formData.sexo === 'FEMININO' &&
                      genderButtonTextSelected),
                  }}
                >
                  F
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={botoesContainer}>
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
      usuario: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UsuarioEdicaoForm;
