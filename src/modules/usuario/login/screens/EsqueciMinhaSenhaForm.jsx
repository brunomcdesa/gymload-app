import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import BackButton from '../../../../components/Button/BackButton';
import SaveButton from '../../../../components/Button/SaveButton';
import ShowPasswordButton from '../../../../components/Button/ShowPasswordButton';
import TextoInput from '../../../../components/Inputs/TextoInput';
import { ComumStyles } from '../../../../components/Styles/ComumStyles';
import { handleChangeState } from '../../../utils/stateUtils';
import { throwToastError, throwToastSuccess } from '../../../utils/toastUtils';
import * as Api from '../Api';
import style from '../style/style';

const EsqueciMinhaSenhaForm = (props) => {
  const { title, formLabel, passwordContainer } = ComumStyles;
  const { container, botoesContainer } = style;
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
    <View style={container}>
      <Text style={title}>Alterar Senha</Text>

      <Text style={formLabel}>Username:</Text>
      <TextoInput
        placeholder="Digite seu username"
        value={formData.username}
        onChangeText={(usernameValue) =>
          handleChange('username', usernameValue)
        }
      />

      <Text style={formLabel}>Nova senha:</Text>
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

EsqueciMinhaSenhaForm.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default EsqueciMinhaSenhaForm;
