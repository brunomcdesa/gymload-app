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

const ListExerciciosTreino = (props) => {
  const { route, navigation } = props;
  const { treinoId, treinoNome } = route.params;
  const { Container, Title, Botoes } = ComumStyles;
  const [exercicios, setExercicios] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchExerciciosDoTreino = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchExerciciosDoTreino(treinoId);
      setExercicios(data);
    } catch (error) {
      throwToastError('Erro ao buscar exercícios deste treino.');
      console.error(`Erro ao buscar exercícios do treino ${treinoId}`, error);
    } finally {
      setLoading(false);
    }
  }, [treinoId]);

  useFocusEffect(
    useCallback(() => {
      fetchExerciciosDoTreino();
    }, [fetchExerciciosDoTreino]),
  );

  return (
    <View style={Container}>
      <Text style={Title}>{treinoNome}</Text>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={exercicios}
          keyExtractor={(exercicio) => exercicio.id}
          renderItem={({ item: exercicio }) => (
            <Exercicio
              id={exercicio.id}
              nome={exercicio.nome}
              descricao={exercicio.descricao}
              grupoMuscular={exercicio.grupoMuscularNome}
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
