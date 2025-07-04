import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import SaveButton from '../../../components/Button/SaveButton';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import * as ExercicioApi from '../../exercicios/Api';
import * as Api from '../Api';

import PropTypes from 'prop-types';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import SelectInput from '../../../components/Inputs/SelectInput';
import TextoInput from '../../../components/Inputs/TextoInput';
import EmptyList from '../../../components/List/EmptyList';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import style from '../style/style';

const renderEmptyList = () => <EmptyList value="exercício" isSelect={true} />;

const TreinoForm = (props) => {
  const {
    formContainer,
    formLabel,
    fabContainer,
    formLabelObrigatorio,
    asteriscoObrigatorio,
  } = ComumStyles;
  const {
    selectedExercisesContainer,
    selectedExerciseItem,
    selectedExerciseText,
    selectedExercisesTitle,
    selectedExercicioList,
  } = style;
  const { navigation, route } = props;
  const { treinoData, isEdicao } = route.params;
  const { id, nome, exerciciosIds } = treinoData;

  const [formData, setFormData] = useState({
    nome: nome || null,
    exerciciosIds: exerciciosIds || [],
  });
  const [exerciciosSelect, setExerciciosSelect] = useState([]);
  const [exerciciosSelectLoading, setExerciciosSelectLodding] = useState(false);
  const [selectedExercicios, setSelectedExercicios] = useState(
    exerciciosIds || [],
  );
  const [selectedExerciciosNomes, setSelectedExerciciosNomes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === 'exerciciosIds') {
      updateSelectedExercisesNames(value);
    }
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
      const { data } = await ExercicioApi.fetchExerciciosDoTreino(id);
      setSelectedExercicios(data.map((exercicio) => exercicio.id));
    } catch (error) {
      throwToastError('Erro ao buscar exercícios do treino.');
      console.error(`Erro ao buscar exercícios do treino ${id}`, error);
    } finally {
      setLoading(false);
    }
  }, [id]);

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

  const renderHeaderTitle = useCallback(() => {
    return (
      <HeaderTitle
        title={isEdicao ? 'Editar Treino' : 'Adicionar Treino'}
        isForm={true}
      />
    );
  }, [isEdicao]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
    });
  }, [navigation, renderHeaderTitle]);

  const handleGoBack = () => {
    if (isEdicao) {
      navigation.navigate('ListExerciciosTreino', {
        treino: { id, nome },
      });
    } else navigation.goBack();
  };

  const updateSelectedExercisesNames = (selectedIds) => {
    const selectedNames = exerciciosSelect
      .filter((ex) => selectedIds.includes(ex.value))
      .map((ex) => ex.label);
    setSelectedExerciciosNomes(selectedNames);
  };

  return (
    <View style={formContainer}>
      <View style={formLabelObrigatorio}>
        <Text style={formLabel}>Nome</Text>
        <Text style={asteriscoObrigatorio}>*</Text>
      </View>
      <TextoInput
        placeholder="Digite o nome"
        value={formData.nome}
        onChangeText={(nomeValue) => handleChange('nome', nomeValue)}
      />

      <View style={formLabelObrigatorio}>
        <Text style={formLabel}>Exercicios</Text>
        <Text style={asteriscoObrigatorio}>*</Text>
      </View>
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

      <View style={selectedExercisesContainer}>
        <Text style={selectedExercisesTitle}>Exercícios Selecionados:</Text>
        <View style={selectedExercicioList}>
          <FlatList
            data={selectedExerciciosNomes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={selectedExerciseItem}>
                <Text style={selectedExerciseText}>{item}</Text>
              </View>
            )}
            ListEmptyComponent={renderEmptyList}
          />
        </View>
      </View>

      <View style={fabContainer}>
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
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      treinoData: PropTypes.object,
      isEdicao: PropTypes.bool,
    }),
  }),
};

export default TreinoForm;
