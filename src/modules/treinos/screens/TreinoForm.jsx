import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import BackButton from '../../../components/Button/BackButton';
import SaveButton from '../../../components/Button/SaveButton';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import * as ExercicioApi from '../../exercicios/Api';
import * as Api from '../Api';

import SelectInput from '../../../components/Inputs/SelectInput';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';

const TreinoForm = (props) => {
  const { FormContainer, Title, FormLabel, FormTextInput, Botoes } =
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
    <View style={FormContainer}>
      <Text style={Title}>Adicionar Treino</Text>

      <Text style={FormLabel}>Nome:</Text>
      <TextInput
        style={FormTextInput}
        placeholder="Digite o nome"
        value={formData.nome}
        onChangeText={(nomeValue) => handleChange('nome', nomeValue)}
      />

      <Text style={FormLabel}>Exercicios:</Text>
      <SelectInput
        open={open}
        setOpen={setOpen}
        items={exerciciosSelect}
        setItems={setExerciciosSelect}
        value={selectedExercicios}
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

      <View style={Botoes}>
        <BackButton navigation={navigation} />
        <SaveButton onPress={handleSave} loading={loading} />
      </View>
    </View>
  );
};

export default TreinoForm;
