import PropTypes from 'prop-types';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ScreenFooter from '../../../components/Button/ScreenFooter';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import TextoInput from '../../../components/Inputs/TextoInput';
import { ComumStyles, colors } from '../../../components/Styles/ComumStyles';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';

const TipoVariacaoForm = (props) => {
  const { asteriscoObrigatorio, formLabel, formLabelObrigatorio } = ComumStyles;
  const { navigation, route } = props;
  const { tipoVariacaoData, isEdicao } = route.params ?? {};

  const [formData, setFormData] = useState({
    nome: tipoVariacaoData?.nome ?? null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.nome?.trim()) {
      throwToastError('O campo Nome é obrigatório.');
      return;
    }

    try {
      setLoading(true);
      if (isEdicao) {
        await Api.editarTipoVariacao(tipoVariacaoData.id, formData);
        throwToastSuccess('Tipo de variação editado com sucesso!');
      } else {
        await Api.saveTipoVariacao(formData);
        throwToastSuccess('Tipo de variação salvo com sucesso!');
      }
      navigation.goBack();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || 'Erro ao salvar tipo de variação.';
      throwToastError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderHeaderTitle = useCallback(() => {
    const title = isEdicao
      ? 'Editar Tipo de Variação'
      : 'Novo Tipo de Variação';
    return <HeaderTitle title={title} isForm />;
  }, [isEdicao]);

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
      <ScrollView contentContainerStyle={style.scrollContent}>
        <View style={style.fieldContainer}>
          <View style={formLabelObrigatorio}>
            <Text style={formLabel}>Nome:</Text>
            <Text style={asteriscoObrigatorio}>*</Text>
          </View>
          <TextoInput
            placeholder="Ex: Halter, Barra, Pegada fechada..."
            value={formData.nome}
            onChangeText={(value) => handleChange('nome', value)}
          />
        </View>
      </ScrollView>

      <ScreenFooter
        onSave={handleSubmit}
        onBack={() => navigation.goBack()}
        loading={loading}
      />
    </View>
  );
};

const style = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
});

TipoVariacaoForm.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      tipoVariacaoData: PropTypes.object,
      isEdicao: PropTypes.bool,
    }),
  }),
};

export default TipoVariacaoForm;
