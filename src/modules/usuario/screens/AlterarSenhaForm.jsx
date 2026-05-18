import PropTypes from 'prop-types';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import FormFooter from '../../../components/Button/FormFooter';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import TextoInput from '../../../components/Inputs/TextoInput';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from './styles/style';

const SENHA_MIN_LENGTH = 6;

const AlterarSenhaForm = (props) => {
  const { navigation } = props;
  const { asteriscoObrigatorio } = ComumStyles;
  const {
    screenContainer,
    scrollContent,
    formDescription,
    requiredNote,
    fieldContainer,
    fieldLabel,
  } = style;

  const [formData, setFormData] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: '',
  });
  const [loading, setLoading] = useState(false);

  const renderHeaderTitle = useCallback(
    () => <HeaderTitle title="Senha e Segurança" />,
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
      headerTitleAlign: 'center',
      headerLeft: () => null,
      gestureEnabled: false,
    });
  }, [navigation, renderHeaderTitle]);

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    if (
      !formData.senhaAtual ||
      !formData.novaSenha ||
      !formData.confirmarSenha
    ) {
      throwToastError('Preencha todos os campos.');
      return;
    }
    if (formData.novaSenha.length < SENHA_MIN_LENGTH) {
      throwToastError('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (formData.novaSenha !== formData.confirmarSenha) {
      throwToastError('As senhas não coincidem.');
      return;
    }

    try {
      setLoading(true);
      await Api.alterarSenhaUsuarioLogado({
        senhaAtual: formData.senhaAtual,
        novaSenha: formData.novaSenha,
      });
      throwToastSuccess('Senha atualizada!');
      navigation.goBack();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.data?.[0]?.message ||
        error?.data?.message ||
        'Erro ao atualizar senha.';
      throwToastError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={screenContainer}>
      <ScrollView contentContainerStyle={scrollContent}>
        <Text style={formDescription}>
          Para sua segurança, confirme sua senha atual antes de definir uma
          nova.
        </Text>
        <Text style={requiredNote}>
          Campos com <Text style={asteriscoObrigatorio}>*</Text> são
          obrigatórios
        </Text>

        <View style={fieldContainer}>
          <Text style={fieldLabel}>
            Senha atual <Text style={asteriscoObrigatorio}>*</Text>
          </Text>
          <TextoInput
            placeholder="Digite sua senha atual"
            value={formData.senhaAtual}
            onChangeText={(v) => handleChange('senhaAtual', v)}
            secureTextEntry
          />
        </View>

        <View style={fieldContainer}>
          <Text style={fieldLabel}>
            Nova senha <Text style={asteriscoObrigatorio}>*</Text>
          </Text>
          <TextoInput
            placeholder="Digite a nova senha"
            value={formData.novaSenha}
            onChangeText={(v) => handleChange('novaSenha', v)}
            secureTextEntry
          />
        </View>

        <View style={fieldContainer}>
          <Text style={fieldLabel}>
            Confirmar nova senha <Text style={asteriscoObrigatorio}>*</Text>
          </Text>
          <TextoInput
            placeholder="Repita a nova senha"
            value={formData.confirmarSenha}
            onChangeText={(v) => handleChange('confirmarSenha', v)}
            secureTextEntry
          />
        </View>
      </ScrollView>

      <FormFooter
        onBack={() => navigation.goBack()}
        onSave={handleSave}
        loading={loading}
      />
    </View>
  );
};

AlterarSenhaForm.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

export default AlterarSenhaForm;
