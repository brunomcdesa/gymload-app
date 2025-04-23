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
  const { treinoId, treinoNome } = route.params;
  const { container, title, Botoes } = ComumStyles;
  const [exercicios, setExercicios] = useState([]);
  const [dadosRegistrosAtividades, setDadosRegistrosAtividades] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchExerciciosDoTreino = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchExerciciosDoTreino(treinoId);
      setExercicios(data);

      if (data && data.length > 0) {
        const exerciciosIds = data.map((exercicio) => exercicio.id);
        await fetchDestaquesDosExercicios(exerciciosIds);
      }
    } catch (error) {
      throwToastError('Erro ao buscar exercícios deste treino.');
      console.error(`Erro ao buscar exercícios do treino ${treinoId}`, error);
    } finally {
      setLoading(false);
    }
  }, [treinoId]);

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

  return (
    <View style={container}>
      <Text style={title}>{treinoNome}</Text>
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

      <View style={Botoes}>
        <BackButton navigation={navigation} />
        <AddButton onPress={() => {}} />
      </View>
    </View>
  );
};

ListExerciciosTreino.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      treinoId: PropTypes.number.isRequired,
      treinoNome: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.object.isRequired,
};

export default ListExerciciosTreino;
