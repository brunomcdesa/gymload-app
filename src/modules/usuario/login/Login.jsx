import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import CadastroButton from '../../../components/Button/CadastroButton';
import EsqueciMinhaSenhaButton from '../../../components/Button/EsqueciMinhaSenhaButton';
import LoginButton from '../../../components/Button/LoginButton';
import ShowPasswordButton from '../../../components/Button/ShowPasswordButton';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { AuthContext } from '../../../context/AuthProvider';
import { handleChangeState } from '../../utils/stateUtils';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from './Api';
import style from './style/style';

const Login = (props) => {
  const { title, FormTextInput, FormLabel, passwordContainer } = ComumStyles;
  const {
    container,
    separatorContainer,
    line,
    separatorText,
    containerEsqueciSenha,
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
    <View style={container}>
      <Text style={title}>Login:</Text>
      <Text style={FormLabel}>Username:</Text>
      <TextInput
        style={FormTextInput}
        placeholder="Digite o username"
        value={formData.username}
        onChangeText={(usernameValue) =>
          handleChange('username', usernameValue)
        }
      />

      <Text style={FormLabel}>senha:</Text>
      <View style={passwordContainer}>
        <TextInput
          style={FormTextInput}
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

      <View style={containerEsqueciSenha}>
        <EsqueciMinhaSenhaButton onPress={handleRedirectResetPasswordForm} />
      </View>

      <View style={separatorContainer}>
        <View style={line} />
        <Text style={separatorText}>OU</Text>
        <View style={line} />
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
