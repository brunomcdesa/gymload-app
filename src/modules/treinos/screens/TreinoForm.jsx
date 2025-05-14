import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import BackButton from '../../../components/Button/BackButton';
import SaveButton from '../../../components/Button/SaveButton';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import * as ExercicioApi from '../../exercicios/Api';
import * as Api from '../Api';

import PropTypes from 'prop-types';
import SelectInput from '../../../components/Inputs/SelectInput';
import TextoInput from '../../../components/Inputs/TextoInput';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';

const TreinoForm = (props) => {
  const { formContainer, title, formLabel, botoesContainer } = ComumStyles;
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

  const fetchExerciciosSelect = useCallback(async () => {
    try {
      setExerciciosSelectLodding(true);
      const { data } = await ExercicioApi.fetchExerciciosSelect();
      setExerciciosSelect(data);
    } catch (error) {
      console.error('Erro ao carregar select de exercícios.');
    } finally {
      setExerciciosSelectLodding(false);
    }
  }, []);

  const fetchExerciciosDoTreino = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await ExercicioApi.fetchExerciciosDoTreino(
        treinoData.id,
      );
      setSelectedExercicios(data.map((exercicio) => exercicio.id));
    } catch (error) {
      throwToastError('Erro ao buscar exercícios do treino.');
      console.error(
        `Erro ao buscar exercícios do treino ${treinoData.id}`,
        error,
      );
    } finally {
      setLoading(false);
    }
  }, [treinoData.id]);

  const handleSave = async () => {
    try {
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
      if (isEdicao) {
        fetchExerciciosDoTreino();
      }
    }, [fetchExerciciosSelect, fetchExerciciosDoTreino, isEdicao]),
  );

  const handleGoBack = () => {
    if (isEdicao) {
      navigation.navigate('ListExerciciosTreino', {
        treino: { id: treinoData.id, nome: formData.nome },
      });
    } else navigation.goBack();
  };

  return (
    <View style={formContainer}>
      <Text style={title}>Adicionar Treino</Text>

      <Text style={formLabel}>Nome:</Text>
      <TextoInput
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
        handleChange={handleChange}
        field={'exerciciosIds'}
        searchable={true}
        searchPlaceholder="Buscar exercícios..."
        zIndex={2000}
        zIndexInverse={100}
      />

      <View style={botoesContainer}>
        <BackButton onPress={navigation.goBack} />
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
    navigate: PropTypes.func.isRequired,
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
