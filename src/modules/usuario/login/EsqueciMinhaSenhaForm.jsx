import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import BackButton from '../../../components/Button/BackButton';
import SaveButton from '../../../components/Button/SaveButton';
import ShowPasswordButton from '../../../components/Button/ShowPasswordButton';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { handleChangeState } from '../../utils/stateUtils';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from './Api';

const EsqueciMinhaSenhaForm = (props) => {
  const {
    Title,
    Botoes,
    FormContainer,
    FormLabel,
    FormTextInput,
    passwordContainer,
  } = ComumStyles;
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { navigation } = props;
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field, value) => {
    handleChangeState(setFormData, formData, field, value);
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.password) {
      throwToastError('Todos os campos são obrigatórios!');
      return;
    }

    try {
      setLoading(true);
      await Api.alterarSenha(formData);
      throwToastSuccess('Senha alterada com sucesso!');
      navigation.goBack();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || 'Erro ao alterar a senha.';
      throwToastError(errorMessage);
      console.log(errorMessage, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={FormContainer}>
      <Text style={Title}>Alterar Senha</Text>

      <Text style={FormLabel}>Username:</Text>
      <TextInput
        style={FormTextInput}
        placeholder="Digite seu username"
        value={formData.username}
        onChangeText={(usernameValue) =>
          handleChange('username', usernameValue)
        }
      />

      <Text style={FormLabel}>Nova senha:</Text>
      <View style={passwordContainer}>
        <TextInput
          style={FormTextInput}
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

      <View style={Botoes}>
        <BackButton navigation={navigation} />
        <SaveButton onPress={handleSubmit} loading={loading} />
      </View>
    </View>
  );
};

EsqueciMinhaSenhaForm.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default EsqueciMinhaSenhaForm;
