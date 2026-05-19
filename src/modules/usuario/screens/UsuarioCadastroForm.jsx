import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnimatedPressable from '../../../components/Button/AnimatedPressable';
import ScreenFooter from '../../../components/Button/ScreenFooter';
import SelectableImage from '../../../components/Selectable/SelectableImage/SelectableImage';
import { colors } from '../../../components/Styles/ComumStyles';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from './styles/style';

const UsuarioCadastroForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    username: '',
    password: '',
    sexo: null,
    idade: '',
    pesoCorporal: '',
    altura: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [uriImagemUsuario, setUriImagemUsuario] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const focus = (field) => () => setFocusedField(field);
  const blur = () => setFocusedField(null);
  const inputRow = (field) => [
    style.loginInputRow,
    focusedField === field && style.loginInputRowFocused,
  ];
  const compactRow = (field) => [
    style.cadastroCompactInputRow,
    focusedField === field && style.cadastroCompactInputRowFocused,
  ];
  const iconColor = (field) =>
    focusedField === field ? colors.secondary : '#aaa';

  // Password strength
  const pw = formData.password;
  const strength = pw ? (pw.length >= 10 ? 3 : pw.length >= 6 ? 2 : 1) : 0;
  const strengthColors = ['', '#dc3545', '#d4a93a', '#28a745'];
  const strengthLabels = ['', 'FRACA', 'OK', 'FORTE'];

  const isFormValid =
    formData.nome && formData.email && formData.username && formData.password;

  const handleSubmit = async () => {
    if (!isFormValid) {
      throwToastError('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      setLoading(true);
      await Api.cadastrarUsuario(formData, uriImagemUsuario);
      throwToastSuccess('Usuário cadastrado com sucesso!');
      navigation.goBack();
    } catch (error) {
      const errorMessage = error.data?.message || 'Erro ao cadastrar usuário.';
      throwToastError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={style.safeAreaBackground} edges={['top', 'bottom']}>
      <View style={style.cadastroTitleWrapper}>
        <Text style={style.cadastroTitle}>Cadastrar-se</Text>
        <Text style={style.cadastroSubtitle}>
          Crie sua conta para começar a registrar seus treinos.
        </Text>
      </View>

      <KeyboardAvoidingView
        style={style.flexOne}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={style.cadastroScrollView}
          contentContainerStyle={style.cadastroScrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Avatar picker */}
          <View style={style.cadastroAvatarSection}>
            <View style={style.positionRelative}>
              <View style={style.cadastroAvatarWrapper}>
                <SelectableImage
                  uriImagemUsuario={uriImagemUsuario}
                  setUriImagemUsuario={setUriImagemUsuario}
                />
              </View>
              <View style={style.cadastroAvatarEditBadge}>
                <MaterialIcons name="edit" size={14} color="#fff" />
              </View>
            </View>
            <Text style={style.cadastroAvatarLabel}>
              Toque para adicionar foto
            </Text>
          </View>

          {/* Nome */}
          <Text style={style.cadastroFieldLabel}>
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
              placeholder="Digite seu nome completo"
              placeholderTextColor={colors.placeholderText}
              value={formData.nome}
              onChangeText={(v) => handleChange('nome', v)}
              onFocus={focus('nome')}
              onBlur={blur}
              autoCapitalize="words"
            />
          </View>

          {/* Email */}
          <Text style={style.cadastroFieldLabel}>
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
              placeholder="Digite seu email"
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
          <Text style={style.cadastroFieldLabel}>
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
              placeholder="Digite seu username"
              placeholderTextColor={colors.placeholderText}
              value={formData.username}
              onChangeText={(v) => handleChange('username', v)}
              onFocus={focus('username')}
              onBlur={blur}
              autoCapitalize="none"
            />
          </View>
          <Text style={style.cadastroHint}>
            Será utilizado para realizar o login.
          </Text>

          {/* Senha */}
          <Text style={style.cadastroFieldLabel}>
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
              placeholder="Digite sua senha"
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

          {/* Password strength bar */}
          {!!pw && (
            <View style={style.cadastroStrengthContainer}>
              <View style={style.cadastroStrengthRow}>
                {[1, 2, 3].map((n) => (
                  <View
                    key={n}
                    style={[
                      style.cadastroStrengthSegment,
                      n <= strength
                        ? { backgroundColor: strengthColors[strength] }
                        : style.strengthSegmentEmpty,
                    ]}
                  />
                ))}
              </View>
              <Text
                style={[
                  style.cadastroStrengthLabel,
                  { color: strengthColors[strength] },
                ]}
              >
                FORÇA: {strengthLabels[strength]}
              </Text>
            </View>
          )}

          {/* Optional: Idade + Peso */}
          <View style={style.cadastroOptionalRow}>
            <View style={style.cadastroOptionalField}>
              <Text style={style.cadastroFieldLabel}>Idade</Text>
              <View style={compactRow('idade')}>
                <TextInput
                  style={style.cadastroCompactInputText}
                  placeholder="Ex: 25"
                  placeholderTextColor={colors.placeholderText}
                  value={formData.idade?.toString() || ''}
                  onChangeText={(v) => handleChange('idade', v)}
                  onFocus={focus('idade')}
                  onBlur={blur}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={style.cadastroOptionalField}>
              <Text style={style.cadastroFieldLabel}>Peso (kg)</Text>
              <View style={compactRow('pesoCorporal')}>
                <TextInput
                  style={style.cadastroCompactInputText}
                  placeholder="Ex: 75.5"
                  placeholderTextColor={colors.placeholderText}
                  value={formData.pesoCorporal?.toString() || ''}
                  onChangeText={(v) => handleChange('pesoCorporal', v)}
                  onFocus={focus('pesoCorporal')}
                  onBlur={blur}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
          </View>

          {/* Optional: Altura + Sexo */}
          <View style={style.cadastroOptionalRow}>
            <View style={style.cadastroOptionalField}>
              <Text style={style.cadastroFieldLabel}>Altura (m)</Text>
              <View style={compactRow('altura')}>
                <TextInput
                  style={style.cadastroCompactInputText}
                  placeholder="Ex: 1.75"
                  placeholderTextColor={colors.placeholderText}
                  value={formData.altura?.toString() || ''}
                  onChangeText={(v) => handleChange('altura', v)}
                  onFocus={focus('altura')}
                  onBlur={blur}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
            <View style={style.cadastroOptionalField}>
              <Text style={style.cadastroFieldLabel}>Sexo</Text>
              <View style={style.cadastroGenderSelector}>
                <AnimatedPressable
                  wrapperStyle={style.genderButtonWrapper}
                  style={[
                    style.genderButton,
                    style.flexOneRadius,
                    formData.sexo === 'MASCULINO' && style.genderButtonSelected,
                  ]}
                  onPress={() =>
                    handleChange(
                      'sexo',
                      formData.sexo === 'MASCULINO' ? null : 'MASCULINO',
                    )
                  }
                >
                  <Text
                    style={[
                      style.genderButtonText,
                      formData.sexo === 'MASCULINO' &&
                        style.genderButtonTextSelected,
                    ]}
                  >
                    M
                  </Text>
                </AnimatedPressable>
                <AnimatedPressable
                  wrapperStyle={style.genderButtonWrapper}
                  style={[
                    style.genderButton,
                    style.flexOneRadius,
                    formData.sexo === 'FEMININO' && style.genderButtonSelected,
                  ]}
                  onPress={() =>
                    handleChange(
                      'sexo',
                      formData.sexo === 'FEMININO' ? null : 'FEMININO',
                    )
                  }
                >
                  <Text
                    style={[
                      style.genderButtonText,
                      formData.sexo === 'FEMININO' &&
                        style.genderButtonTextSelected,
                    ]}
                  >
                    F
                  </Text>
                </AnimatedPressable>
              </View>
            </View>
          </View>

          <Text style={style.cadastroJaTemConta}>
            Já tem uma conta?{' '}
            <Text
              style={style.cadastroEntrarLink}
              onPress={() => navigation.goBack()}
            >
              Entrar
            </Text>
          </Text>
        </ScrollView>

        <ScreenFooter
          onBack={() => navigation.goBack()}
          onSave={handleSubmit}
          loading={loading}
          saveLabel="CADASTRAR"
          saveIcon="person-add"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

UsuarioCadastroForm.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

export default UsuarioCadastroForm;
