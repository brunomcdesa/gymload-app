import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import BackButton from '../../../components/Button/BackButton';
import SaveButton from '../../../components/Button/SaveButton';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { handleChangeState } from '../../utils/stateUtils';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';

const GrupoMuscularForm = (props) => {
  const { title, botoesContainer, formContainer, formLabel, formTextInput } =
    ComumStyles;
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

  return (
    <View style={formContainer}>
      <Text style={title}>Adicionar Grupo Muscular</Text>

      <Text style={formLabel}>Nome:</Text>
      <TextInput
        style={formTextInput}
        placeholder="Digite o nome"
        value={formData.nome}
        onChangeText={(nomeValue) => handleChange('nome', nomeValue)}
      />

      <Text style={formLabel}>Codigo:</Text>
      <TextInput
        style={formTextInput}
        placeholder="Digite o codigo"
        value={formData.codigo}
        onChangeText={(codigoValue) => handleChange('codigo', codigoValue)}
      />

      <View style={botoesContainer}>
        <BackButton navigation={navigation} />
        <SaveButton onPress={handleSubmit} loading={loading} />
      </View>
    </View>
  );
};

GrupoMuscularForm.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default GrupoMuscularForm;
