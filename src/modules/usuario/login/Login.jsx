import React, { useContext, useState } from 'react';
import { Alert, Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { colors, ComumStyles } from '../../../components/Styles/ComumStyles';
import { AuthContext } from '../../../context/AuthProvider';
import { handleChangeState } from '../../utils/stateUtils';
import * as Api from './Api';
import style from './style/style';

const Login = () => {
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

      <TouchableOpacity
        style={{
          backgroundColor: colors.secondary,
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          marginBottom: 20,
        }}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={{ color: colors.buttonText, fontWeight: 'bold' }}>Realizar Cadastro</Text>
      </TouchableOpacity>

     
    </View>
  );
};

export default Login;
