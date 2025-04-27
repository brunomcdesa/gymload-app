import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import AddButton from '../../../components/Button/AddButton';
import BackButton from '../../../components/Button/BackButton';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { throwToastError } from '../../utils/toastUtils';
import * as Api from '../Api';
import Exercicio from '../Exercicio';
import * as RegistroAtividadeApi from '../registrosAtividades/Api';

const ListExerciciosTreino = (props) => {
  const { route, navigation } = props;
  const { treino } = route.params;
  const { container, title, botoesContainer } = ComumStyles;
  const [exercicios, setExercicios] = useState([]);
  const [dadosRegistrosAtividades, setDadosRegistrosAtividades] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchExerciciosDoTreino = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchExerciciosDoTreino(treino.id);
      setExercicios(data);

      if (data && data.length > 0) {
        const exerciciosIds = getExerciciosIds(data);
        await fetchDestaquesDosExercicios(exerciciosIds);
      }
    } catch (error) {
      throwToastError('Erro ao buscar exercícios deste treino.');
      console.error(`Erro ao buscar exercícios do treino ${treino.id}`, error);
    } finally {
      setLoading(false);
    }
  }, [treino.id]);

  const fetchDestaquesDosExercicios = async (exerciciosIds) => {
    try {
      if (!exerciciosIds || exerciciosIds.length === 0) return;
      const { data } =
        await RegistroAtividadeApi.fetchDestaquesDeExercicios(exerciciosIds);

      const dadosMap = {};
      data.forEach((destaque) => {
        dadosMap[destaque.exercicioId] = destaque;
      });

      setDadosRegistrosAtividades(dadosMap);
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Erro ao buscar destaques:', error.response.data);
      } else {
        console.error('Erro ao buscar destaques:', error);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchExerciciosDoTreino();
    }, [fetchExerciciosDoTreino]),
  );

  const getExerciciosIds = (exercicios) => {
    return exercicios.map((exercicio) => exercicio.id);
  };

  const redirectToTreinoForm = () => {
    navigation.navigate('TreinoForm', {
      treinoData: {
        id: treino.id,
        nome: treino.nome,
        exerciciosIds: getExerciciosIds(exercicios),
      },
      isEdicao: true,
    });
  };

  const handleGoBack = () => {
    navigation.navigate('ListTreino');
  };

  return (
    <View style={container}>
      <Text style={title}>{treino.nome}</Text>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={exercicios}
          keyExtractor={(exercicio) => exercicio.id}
          renderItem={({ item: exercicio }) => (
            <Exercicio
              exercicioData={exercicio}
              dadosRegistrosAtividades={
                dadosRegistrosAtividades[exercicio.id] || null
              }
            />
          )}
        />
      )}

      <View style={botoesContainer}>
        <BackButton onPress={handleGoBack} />
        <AddButton onPress={redirectToTreinoForm} text={'Editar'} />
      </View>
    </View>
  );
};

ListExerciciosTreino.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      treino: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.object.isRequired,
};

export default ListExerciciosTreino;
