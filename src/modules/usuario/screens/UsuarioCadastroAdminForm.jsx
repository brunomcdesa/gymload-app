import PropTypes from 'prop-types';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnimatedPressable from '../../../components/Button/AnimatedPressable';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import { colors } from '../../../components/Styles/ComumStyles';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from './styles/style';

const UsuarioCadastroAdminForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));
  const focus = (field) => () => setFocusedField(field);
  const blur = () => setFocusedField(null);
  const inputRow = (field) => [
    style.loginInputRow,
    focusedField === field && style.loginInputRowFocused,
  ];
  const iconColor = (field) =>
    focusedField === field ? colors.secondary : '#aaa';

  const isFormValid =
    formData.nome && formData.email && formData.username && formData.password;

  const handleSave = async () => {
    if (!isFormValid) {
      throwToastError('Preencha todos os campos obrigatórios');
      return;
    }
    try {
      setLoading(true);
      await Api.cadastrarUsuarioAdmin(formData);
      throwToastSuccess('Usuário cadastrado com sucesso!');
      navigation.goBack();
    } catch (error) {
      const errorMessage = error.data?.message || 'Erro ao cadastrar usuário.';
      throwToastError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderHeaderTitle = useCallback(
    () => (
      <HeaderTitle
        title="Cadastrar Admin"
        subtitle="Preencha os dados do novo admin."
      />
    ),
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
      headerTitleAlign: 'center',
      headerLeft: () => null,
      headerBackVisible: false,
      gestureEnabled: false,
    });
  }, [navigation, renderHeaderTitle]);

  return (
    <View style={style.screenContainer}>
      <ScrollView
        contentContainerStyle={style.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={style.requiredNote}>
          {'Campos com '}
          <Text style={style.cadastroRequired}>*</Text>
          {' são obrigatórios'}
        </Text>

        {/* Nome */}
        <Text style={style.fieldLabel}>
          {'Nome '}
          <Text style={style.cadastroRequired}>*</Text>
        </Text>
        <View style={inputRow('nome')}>
          <MaterialIcons
            name="person"
            size={20}
            color={iconColor('nome')}
            style={style.loginInputIcon}
          />
          <TextInput
            style={style.loginInputText}
            placeholder="Digite o nome completo"
            placeholderTextColor={colors.placeholderText}
            value={formData.nome}
            onChangeText={(v) => handleChange('nome', v)}
            onFocus={focus('nome')}
            onBlur={blur}
            autoCapitalize="words"
          />
        </View>

        {/* Email */}
        <Text style={style.fieldLabel}>
          {'Email '}
          <Text style={style.cadastroRequired}>*</Text>
        </Text>
        <View style={inputRow('email')}>
          <MaterialIcons
            name="email"
            size={20}
            color={iconColor('email')}
            style={style.loginInputIcon}
          />
          <TextInput
            style={style.loginInputText}
            placeholder="Digite o email"
            placeholderTextColor={colors.placeholderText}
            value={formData.email}
            onChangeText={(v) => handleChange('email', v)}
            onFocus={focus('email')}
            onBlur={blur}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Username */}
        <Text style={style.fieldLabel}>
          {'Username '}
          <Text style={style.cadastroRequired}>*</Text>
        </Text>
        <View style={inputRow('username')}>
          <MaterialIcons
            name="alternate-email"
            size={20}
            color={iconColor('username')}
            style={style.loginInputIcon}
          />
          <TextInput
            style={style.loginInputText}
            placeholder="Digite o username"
            placeholderTextColor={colors.placeholderText}
            value={formData.username}
            onChangeText={(v) => handleChange('username', v)}
            onFocus={focus('username')}
            onBlur={blur}
            autoCapitalize="none"
          />
        </View>

        {/* Senha */}
        <Text style={style.fieldLabel}>
          {'Senha '}
          <Text style={style.cadastroRequired}>*</Text>
        </Text>
        <View style={inputRow('password')}>
          <MaterialIcons
            name="lock"
            size={20}
            color={iconColor('password')}
            style={style.loginInputIcon}
          />
          <TextInput
            style={style.loginInputText}
            placeholder="Digite a senha"
            placeholderTextColor={colors.placeholderText}
            value={formData.password}
            onChangeText={(v) => handleChange('password', v)}
            onFocus={focus('password')}
            onBlur={blur}
            secureTextEntry={!showPassword}
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
      </ScrollView>

      {/* Footer fixo — fora do ScrollView */}
      <View style={style.screenFooter}>
        <AnimatedPressable
          testID="btn-voltar"
          wrapperStyle={style.backButtonWrapper}
          style={style.backButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={style.backButtonText}>Voltar</Text>
        </AnimatedPressable>
        <AnimatedPressable
          testID="btn-salvar"
          wrapperStyle={style.saveButtonWrapper}
          style={[style.saveButton, loading && style.saveButtonDisabled]}
          onPress={!loading ? handleSave : null}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <MaterialIcons name="save" size={18} color="#fff" />
              <Text style={style.saveButtonText}>CADASTRAR</Text>
            </>
          )}
        </AnimatedPressable>
      </View>
    </View>
  );
};

UsuarioCadastroAdminForm.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

export default UsuarioCadastroAdminForm;
