import PropTypes from 'prop-types';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import FormFooter from '../../../components/Button/FormFooter';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import TextoInput from '../../../components/Inputs/TextoInput';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { handleChangeState } from '../../utils/stateUtils';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from '../style/style';

const GrupoMuscularForm = (props) => {
  const { asteriscoObrigatorio, formLabel, formLabelObrigatorio } = ComumStyles;
  const { navigation } = props;
  const [formData, setFormData] = useState({
    nome: null,
    codigo: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    handleChangeState(setFormData, formData, field, value);
  };

  const handleSubmit = async () => {
    if (!formData.nome || !formData.codigo) {
      throwToastError('Todos os campos são obrigatórios!');
      return;
    }

    try {
      setLoading(true);
      await Api.saveGrupoMuscular(formData);
      throwToastSuccess('Grupo Muscular salvo com sucesso!');
      navigation.goBack();
    } catch (error) {
      throwToastError('Erro ao salvar grupo muscular.');
      console.log('Erro ao salvar grupo muscular.', error);
    } finally {
      setLoading(false);
    }
  };

  const renderHeaderTitle = useCallback(() => {
    return <HeaderTitle title="Adicionar Grupo Muscular" isForm />;
  }, []);

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
            placeholder="Digite o nome"
            value={formData.nome}
            onChangeText={(nomeValue) => handleChange('nome', nomeValue)}
          />
        </View>

        <View style={style.fieldContainer}>
          <View style={formLabelObrigatorio}>
            <Text style={formLabel}>Código:</Text>
            <Text style={asteriscoObrigatorio}>*</Text>
          </View>
          <TextoInput
            placeholder="Digite o código"
            value={formData.codigo}
            onChangeText={(codigoValue) => handleChange('codigo', codigoValue)}
          />
        </View>
      </ScrollView>

      <FormFooter
        onSave={handleSubmit}
        onBack={() => navigation.goBack()}
        loading={loading}
      />
    </View>
  );
};

GrupoMuscularForm.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

export default GrupoMuscularForm;
