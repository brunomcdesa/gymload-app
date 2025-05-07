import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import BackButton from '../../../components/Button/BackButton';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { throwToastError } from '../../utils/toastUtils';
import * as Api from '../Api';
import Exercicio from '../Exercicio';
import { fetchDestaquesDosExercicios } from '../utils/exerciciosUtils';

const ListExerciciosTreino = (props) => {
  const { route, navigation } = props;
  const { treino } = route.params;
  const { container, title } = ComumStyles;
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
        await fetchDestaquesDosExercicios(
          exerciciosIds,
          setDadosRegistrosAtividades,
        );
      }
    } catch (error) {
      throwToastError('Erro ao buscar exercícios deste treino.');
      console.error(`Erro ao buscar exercícios do treino ${treino.id}`, error);
    } finally {
      setLoading(false);
    }
  }, [treino.id]);

  useFocusEffect(
    useCallback(() => {
      fetchExerciciosDoTreino();
    }, [fetchExerciciosDoTreino]),
  );

  const getExerciciosIds = (exercicios) => {
    return exercicios.map((exercicio) => exercicio.id);
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

      <BackButton onPress={navigation.goBack} />
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
