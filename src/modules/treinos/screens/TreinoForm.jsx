import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
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
  const { navigation, route } = props;
  const { treinoData, isEdicao } = route.params;

  const [formData, setFormData] = useState({
    nome: treinoData.nome || null,
    exerciciosIds: treinoData.exerciciosIds || [],
  });
  const [exerciciosSelect, setExerciciosSelect] = useState([]);
  const [exerciciosSelectLoading, setExerciciosSelectLodding] = useState(false);
  const [selectedExercicios, setSelectedExercicios] = useState(
    treinoData.exerciciosIds || [],
  );
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
      console.log('Salvando novo');
      setLoading(true);
      await Api.saveTreinos(formData);
      throwToastSuccess('Treino salvo com sucesso!');
      handleGoBack();
    } catch (error) {
      throwToastError('Erro ao salvar treino.');
      console.log('Erro ao salvar treino.', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = async () => {
    try {
      setLoading(true);
      await Api.editarTreinos({ id: treinoData.id, request: formData });
      throwToastSuccess('Treino salvo com sucesso!');
      handleGoBack();
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

  const handleGoBack = () => {
    navigation.navigate('ListExerciciosTreino', {
      treino: { id: treinoData.id, nome: formData.nome },
    });
  };
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
        <BackButton onPress={() => navigation.goBack()} />
        <SaveButton
          onPress={isEdicao ? handleEditar : handleSave}
          loading={loading}
        />
      </View>
    </View>
  );
};

TreinoForm.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      treinoData: PropTypes.object,
      isEdicao: PropTypes.bool,
    }),
  }),
};

export default TreinoForm;
