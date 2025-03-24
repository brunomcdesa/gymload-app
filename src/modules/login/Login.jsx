import React, { useContext, useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import ComumStyles from '../../components/Styles/ComumStyles';
import { AuthContext } from '../../context/AuthProvider';
import { handleChangeState } from '../utils/stateUtils';
import * as Api from './Api';
import style from './style/style';

const Login = () => {
  const { Title, FormTextInput } = ComumStyles;
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (field, value) => {
    handleChangeState(setFormData, formData, field, value);
  };

  const handleRealizarLogin = async () => {
    try {
      const { data } = await Api.realizarLogin(formData);
      login(data.token);
      Alert.alert('Sucesso!', 'Login realizado com sucesso!');
    } catch (error) {
      Alert.alert('Falha!', 'Username ou senha incorretos.');
      console.log('Erro ao realizar login.', error);
    }
  };

  return (
    <View style={style.Container}>
      <Text style={Title}>Login:</Text>
      <Text>Username:</Text>
      <TextInput
        style={FormTextInput}
        placeholder="Digite o username"
        value={formData.username}
        onChangeText={(usernameValue) =>
          handleChange('username', usernameValue)
        }
      />

      <Text>senha:</Text>
      <TextInput
        style={FormTextInput}
        placeholder="Digite sua senha"
        value={formData.password}
        onChangeText={(passwordValue) => {
          handleChange('password', passwordValue);
        }}
      />

      <Button title="Realizar Login" onPress={handleRealizarLogin} />
    </View>
  );
};

export default Login;
