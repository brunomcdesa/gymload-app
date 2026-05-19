import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import ScreenFooter from '../../../components/Button/ScreenFooter';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { finalizarTreino } from '../../treinos/Api';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';

import Exercicio from '../components/Exercicio';
import style from '../style/style';
import { fetchDestaquesDosExercicios } from '../utils/exerciciosUtils';

const ListExerciciosTreino = (props) => {
  const { navigation, route } = props;
  const { treino } = route.params;
  const { id, nome } = treino;
  const [exercicios, setExercicios] = useState([]);
  const [dadosRegistrosAtividades, setDadosRegistrosAtividades] = useState({});
  const [loading, setLoading] = useState(false);
  const [finalizando, setFinalizando] = useState(false);

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

  const handleFinalizarTreino = async () => {
    try {
      setFinalizando(true);
      await finalizarTreino(id);
      throwToastSuccess('Treino finalizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      throwToastError(
        error.response?.data?.message || 'Erro ao finalizar treino.',
      );
    } finally {
      setFinalizando(false);
    }
  };

  const redirectRegistroAtividadesCompleto = (exercicio) => {
    navigation.navigate('RegistroAtividadesCompleto', { exercicio });
  };

  const renderHeaderTitle = useCallback(() => {
    return <HeaderTitle title={nome} />;
  }, [nome]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
      headerLeft: () => null,
      headerBackVisible: false,
      gestureEnabled: false,
    });
  }, [navigation, renderHeaderTitle]);

  return (
    <View style={style.screenContainer}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={exercicios}
          keyExtractor={(exercicio) => exercicio.id}
          contentContainerStyle={style.listContent}
          renderItem={({ item: exercicio }) => (
            <Exercicio
              exercicioData={exercicio}
              dadosRegistrosAtividades={
                dadosRegistrosAtividades[exercicio.id] || null
              }
              onViewHistorico={() =>
                redirectRegistroAtividadesCompleto(exercicio)
              }
            />
          )}
        />
      )}
      <ScreenFooter
        onBack={() => navigation.goBack()}
        onSave={handleFinalizarTreino}
        loading={finalizando}
        saveLabel="FINALIZAR TREINO"
        saveIcon={null}
      />
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
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default ListExerciciosTreino;
