import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import LogoMark from '../../../components/Logo/LogoMark';
import { colors } from '../../../components/Styles/ComumStyles';
import { AuthContext } from '../../../context/AuthProvider';
import { handleChangeState } from '../../utils/stateUtils';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from './styles/style';

const Login = (props) => {
  const { navigation } = props;
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ login: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);

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
    <ScrollView
      contentContainerStyle={style.loginScrollContent}
      keyboardShouldPersistTaps="handled"
    >
      {/* Logo section */}
      <View style={style.loginLogoSection}>
        <LogoMark width={128} height={64} bg={colors.background} />
        <Text style={style.loginLogoTitle}>
          Gym<Text style={style.loginLogoTitleAccent}>load</Text>
        </Text>
        <Text style={style.loginLogoSubtitle}>TRACK EVERY REP</Text>
      </View>

      {/* Username input */}
      <View
        style={[
          style.loginInputRow,
          usernameFocused && style.loginInputRowFocused,
        ]}
      >
        <MaterialIcons
          name="person"
          size={20}
          color={usernameFocused ? colors.secondary : '#aaa'}
          style={style.loginInputIcon}
        />
        <TextInput
          style={style.loginInputText}
          placeholder="Username ou email"
          placeholderTextColor={colors.placeholderText}
          value={formData.login}
          onChangeText={(v) => handleChange('login', v)}
          onFocus={() => setUsernameFocused(true)}
          onBlur={() => setUsernameFocused(false)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      {/* Password input */}
      <View
        style={[
          style.loginInputRow,
          passwordFocused && style.loginInputRowFocused,
        ]}
      >
        <MaterialIcons
          name="lock"
          size={20}
          color={passwordFocused ? colors.secondary : '#aaa'}
          style={style.loginInputIcon}
        />
        <TextInput
          style={style.loginInputText}
          placeholder="Digite sua senha"
          placeholderTextColor={colors.placeholderText}
          value={formData.password}
          onChangeText={(v) => handleChange('password', v)}
          secureTextEntry={!showPassword}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
        />
        <TouchableOpacity
          onPress={() => setShowPassword((s) => !s)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <MaterialIcons
            name={showPassword ? 'visibility-off' : 'visibility'}
            size={20}
            color="#aaa"
          />
        </TouchableOpacity>
      </View>

      {/* Esqueci minha senha — right-aligned */}
      <View style={style.loginEsqueciRow}>
        <TouchableOpacity onPress={handleRedirectResetPasswordForm}>
          <Text style={style.loginEsqueciText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      {/* Entrar button */}
      {loading ? (
        <LoadingIndicator />
      ) : (
        <TouchableOpacity
          testID="login-entrar-button"
          style={style.loginEntrarButton}
          onPress={handleRealizarLogin}
          activeOpacity={0.8}
        >
          <Text style={style.loginEntrarButtonText}>ENTRAR</Text>
        </TouchableOpacity>
      )}

      {/* Divider */}
      <View style={style.loginSeparatorContainer}>
        <View style={style.loginLine} />
        <Text style={style.loginSeparatorText}>OU</Text>
        <View style={style.loginLine} />
      </View>

      {/* Cadastrar-se ghost button */}
      <TouchableOpacity
        style={style.loginCadastrarButton}
        onPress={handleRedirectCadastroUser}
        activeOpacity={0.8}
      >
        <Text style={style.loginCadastrarButtonText}>Cadastrar-se</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
