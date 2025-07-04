import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { throwToastError } from '../../utils/toastUtils';
import * as Api from '../Api';
import Exercicio from '../Exercicio';
import { fetchDestaquesDosExercicios } from '../utils/exerciciosUtils';

const ListExerciciosTreino = (props) => {
  const { navigation, route } = props;
  const { treino } = route.params;
  const { id, nome } = treino;
  const { container } = ComumStyles;
  const [exercicios, setExercicios] = useState([]);
  const [dadosRegistrosAtividades, setDadosRegistrosAtividades] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchExerciciosDoTreino = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchExerciciosDoTreino(id);
      setExercicios(data);

      if (data && data.length > 0) {
        const exerciciosIds = data.map((exercicio) => exercicio.id);
        await fetchDestaquesDosExercicios(
          exerciciosIds,
          setDadosRegistrosAtividades,
        );
      }
    } catch (error) {
      throwToastError('Erro ao buscar exercícios deste treino.');
      console.error(`Erro ao buscar exercícios do treino ${id}`, error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      fetchExerciciosDoTreino();
    }, [fetchExerciciosDoTreino]),
  );

  const renderHeaderTitle = useCallback(() => {
    return <HeaderTitle title={nome} />;
  }, [nome]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
    });
  }, [navigation, renderHeaderTitle]);

  return (
    <View style={container}>
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
    </View>
  );
};

ListExerciciosTreino.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      treino: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

export default ListExerciciosTreino;
