import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import BackButton from '../../../components/Button/BackButton';
import SaveButton from '../../../components/Button/SaveButton';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import * as ExercicioApi from '../../exercicios/Api';
import * as Api from '../Api';

import PropTypes from 'prop-types';
import SelectInput from '../../../components/Inputs/SelectInput';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';

const TreinoForm = (props) => {
  const { formContainer, title, formLabel, formTextInput, botoesContainer } =
    ComumStyles;
  const { navigation } = props;

  const [formData, setFormData] = useState({
    nome: null,
    exerciciosIds: [],
  });
  const [exerciciosSelect, setExerciciosSelect] = useState([]);
  const [exerciciosSelectLoading, setExerciciosSelectLodding] = useState(false);
  const [selectedExercicios, setSelectedExercicios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const fetchExerciciosSelect = async () => {
    try {
      setExerciciosSelectLodding(true);
      const { data } = await ExercicioApi.fetchExerciciosSelect();
      setExerciciosSelect(data);
    } catch (error) {
      console.error('Erro ao carregar select de exercícios.');
    } finally {
      setExerciciosSelectLodding(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await Api.saveTreinos(formData);
      throwToastSuccess('Treino salvo com sucesso!');
      navigation.goBack();
    } catch (error) {
      throwToastError('Erro ao salvar treino.');
      console.log('Erro ao salvar treino.', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchExerciciosSelect();
    }, []),
  );

  useEffect(() => {
    setSelectedExercicios(formData.exerciciosIds);
  }, [formData.exerciciosIds]);

  return (
    <View style={formContainer}>
      <Text style={title}>Adicionar Treino</Text>

      <Text style={formLabel}>Nome:</Text>
      <TextInput
        style={formTextInput}
        placeholder="Digite o nome"
        value={formData.nome}
        onChangeText={(nomeValue) => handleChange('nome', nomeValue)}
      />

      <Text style={formLabel}>Exercicios:</Text>
      <SelectInput
        open={open}
        setOpen={setOpen}
        items={exerciciosSelect}
        setItems={setExerciciosSelect}
        value={selectedExercicios || []}
        setValue={setSelectedExercicios}
        multiple={true}
        loading={exerciciosSelectLoading}
        placeholder="Selecione os Exercícios"
        handleChange={handleChange}
        field={'exerciciosIds'}
        searchable={true}
        searchPlaceholder="Buscar exercícios..."
        zIndex={2000}
        zIndexInverse={100}
      />

      <View style={botoesContainer}>
        <BackButton navigation={navigation} />
        <SaveButton onPress={handleSave} loading={loading} />
      </View>
    </View>
  );
};

TreinoForm.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default TreinoForm;
