import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import CadastroButton from '../../../components/Button/CadastroButton';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { AuthContext } from '../../../context/AuthProvider';
import { handleChangeState } from '../../utils/stateUtils';
import * as Api from './Api';
import style from './style/style';

const Login = (props) => {
  const { Title, FormTextInput, FormLabel } = ComumStyles;
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    handleChangeState(setFormData, formData, field, value);
  };

  const handleRealizarLogin = async () => {
    try {
      setLoading(true);
      const { data } = await Api.realizarLogin(formData);
      login(data.token);
      Alert.alert('Sucesso!', 'Login realizado com sucesso!');
    } catch (error) {
      Alert.alert('Falha!', 'Username ou senha incorretos.');
      console.log('Erro ao realizar login.', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedirectCadastroUser = () => {
    props.navigation.navigate('CadastroUsuario', { isCadastroAdmin: false });
  };

  return (
    <View style={style.Container}>
      <Text style={Title}>Login:</Text>
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
      <TextInput
        style={FormTextInput}
        placeholder="Digite sua senha"
        value={formData.password}
        onChangeText={(passwordValue) => {
          handleChange('password', passwordValue);
        }}
      />

      {loading ? (
        <LoadingIndicator />
      ) : (
        <Button title="Realizar Login" onPress={handleRealizarLogin} />
      )}

      <View style={style.separatorContainer}>
        <View style={style.line} />
        <Text style={style.separatorText}>OU</Text>
        <View style={style.line} />
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
