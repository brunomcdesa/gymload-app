import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnimatedPressable from '../../../components/Button/AnimatedPressable';

import { colors } from '../../../components/Styles/ComumStyles';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from './styles/style';

const EsqueciMinhaSenhaForm = ({ navigation }) => {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

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

  const pw = formData.password;
  const strength = pw ? (pw.length >= 10 ? 3 : pw.length >= 6 ? 2 : 1) : 0;
  const strengthColors = ['', '#dc3545', '#d4a93a', '#28a745'];
  const strengthLabels = ['', 'FRACA', 'OK', 'FORTE'];

  const handleSubmit = async () => {
    if (!formData.identifier || !formData.password) {
      throwToastError('Todos os campos são obrigatórios!');
      return;
    }

    try {
      setLoading(true);
      await Api.alterarSenha({
        identifier: formData.identifier,
        password: formData.password,
      });
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
    <SafeAreaView style={style.safeAreaBackground}>
      <ScrollView
        contentContainerStyle={style.esqueciScrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Ícone */}
        <View style={style.esqueciIconSection}>
          <View style={style.esqueciIconWrapper}>
            <MaterialIcons
              name="lock-reset"
              size={36}
              color={colors.secondary}
            />
          </View>
          <Text style={style.esqueciTitle}>Redefinir Senha</Text>
          <Text style={style.esqueciSubtitle}>
            Informe seu username ou email e crie uma nova senha de acesso.
          </Text>
        </View>

        {/* Username ou Email */}
        <Text style={style.cadastroFieldLabel}>
          {'Username ou Email '}
          <Text style={style.cadastroRequired}>*</Text>
        </Text>
        <View style={inputRow('identifier')}>
          <MaterialIcons
            name="alternate-email"
            size={20}
            color={iconColor('identifier')}
            style={style.loginInputIcon}
          />
          <TextInput
            style={style.loginInputText}
            placeholder="Digite seu username ou email"
            placeholderTextColor={colors.placeholderText}
            value={formData.identifier}
            onChangeText={(v) => handleChange('identifier', v)}
            onFocus={focus('identifier')}
            onBlur={blur}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Nova senha */}
        <Text style={style.cadastroFieldLabel}>
          {'Nova senha '}
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
            placeholder="Digite a nova senha"
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

        {/* Barra de força da senha */}
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

        {/* Footer */}
        <View style={style.esqueciFooter}>
          <AnimatedPressable
            style={style.esqueciVoltarButton}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={style.esqueciVoltarButtonText}>Voltar</Text>
          </AnimatedPressable>
          <AnimatedPressable
            style={[
              style.esqueciAltButton,
              loading && style.esqueciAltButtonDisabled,
            ]}
            onPress={!loading ? handleSubmit : null}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={style.esqueciAltButtonText}>ALTERAR SENHA</Text>
            )}
          </AnimatedPressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

EsqueciMinhaSenhaForm.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

export default EsqueciMinhaSenhaForm;
