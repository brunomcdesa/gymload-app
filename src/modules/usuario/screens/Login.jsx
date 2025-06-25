import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';

import CadastroButton from '../../../components/Button/CadastroButton';
import EsqueciMinhaSenhaButton from '../../../components/Button/EsqueciMinhaSenhaButton';
import LoginButton from '../../../components/Button/LoginButton';
import ShowPasswordButton from '../../../components/Button/ShowPasswordButton';
import TextoInput from '../../../components/Inputs/TextoInput';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';

import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { AuthContext } from '../../../context/AuthProvider';
import { handleChangeState } from '../../utils/stateUtils';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from './styles/style';

const Login = (props) => {
  const { title, formLabel, passwordContainer } = ComumStyles;
  const {
    loginContainer,
    loginSeparatorContainer,
    loginLine,
    loginSeparatorText,
    loginContainerEsqueciSenha,
  } = style;
  const { navigation } = props;
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field, value) => {
    handleChangeState(setFormData, formData, field, value);
  };

  const handleRealizarLogin = async () => {
    try {
      setLoading(true);
      const { data } = await Api.realizarLogin(formData);
      login(data.token);
      throwToastSuccess('Login realizado com sucesso!');
    } catch (error) {
      throwToastError('Erro ao realizar login');
      console.log('Erro ao realizar login.', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedirectCadastroUser = () => {
    navigation.navigate('CadastroUsuario', { isCadastroAdmin: false });
  };

  const handleRedirectResetPasswordForm = () => {
    navigation.navigate('EsqueciMinhaSenha');
  };

  return (
    <View style={loginContainer}>
      <Text style={title}>Login:</Text>
      <Text style={formLabel}>Username:</Text>
      <TextoInput
        placeholder="Digite o username"
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
          onChangeText={(passwordValue) => {
            handleChange('password', passwordValue);
          }}
          secureTextEntry={!showPassword}
        />
        <ShowPasswordButton
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </View>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <LoginButton onPress={handleRealizarLogin} />
      )}

      <View style={loginContainerEsqueciSenha}>
        <EsqueciMinhaSenhaButton onPress={handleRedirectResetPasswordForm} />
      </View>

      <View style={loginSeparatorContainer}>
        <View style={loginLine} />
        <Text style={loginSeparatorText}>OU</Text>
        <View style={loginLine} />
      </View>

      <CadastroButton
        text={'Cadastrar-se'}
        onPress={handleRedirectCadastroUser}
      />
    </View>
  );
};

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
