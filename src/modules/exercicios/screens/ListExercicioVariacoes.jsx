import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import AddButton from '../../../components/Button/AddButton';
import SearchInput from '../../../components/Inputs/SearchInput';
import EmptyList from '../../../components/List/EmptyList';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import SelectableItem from '../../../components/Selectable/SelectableItem/SelectableItem';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import * as RegistroAtividadeApi from '../../registrosAtividades/Api';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import { useIsAdmin } from '../../utils/userUtils';
import * as Api from '../Api';

import HeaderTitle from '../../../components/Header/HeaderTitle';
import ExercicioVariacao from '../components/ExercicioVariacao';
import style from '../style/style';

const ListExercicioVariacoes = (props) => {
  const { container, fabContainer } = ComumStyles;
  const { listHeader } = style;
  const { navigation, route } = props;
  const { exercicioBase } = route.params;
  const { id, nome } = exercicioBase;
  const [exerciciosVariacoes, setExerciciosVariacoes] = useState([]);
  const [filteredExerciciosVariacoes, setFilteredExerciciosVariacoes] =
    useState([]);
  // const [dadosRegistrosAtividades, setDadosRegistrosAtividades] = useState({});
  const [loading, setLoading] = useState(false);

  const isAdmin = useIsAdmin();

  const renderEmptyList = () => <EmptyList value="exercício" />;

  const fetchExercicioVariacoes = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchExercicioVariacoes(id);
      console.log(...data);
      setExerciciosVariacoes(data);
      setFilteredExerciciosVariacoes(data);

      // DESTAQUES FAZER POSTERIORMENTE
      // if (data && data.length > 0) {
      //   const exerciciosIds = data.map((exercicio) => exercicio.id);
      //   await fetchDestaquesDosExercicios(
      //     exerciciosIds,
      //     setDadosRegistrosAtividades,
      //   );
      // }
    } catch (error) {
      console.log({ ...error });
      console.error('Erro ao buscar exercicios:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      fetchExercicioVariacoes();
    }, [fetchExercicioVariacoes]),
  );

  const renderHeaderTitle = useCallback(() => {
    return <HeaderTitle title={`Variações de ${nome}`} />;
  }, [nome]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
    });
  }, [navigation, renderHeaderTitle]);

  const redirectExercicioForm = () => {
    navigation.navigate('ExercicioForm', {
      exercicioData: {},
      isEdicao: false,
    });
  };

  const handleSearchResults = (filteredData) => {
    setFilteredExerciciosVariacoes(filteredData);
  };

  const redirectRegistroAtividadesCompleto = (exercicio) => {
    navigation.navigate('RegistroAtividadesCompleto', {
      exercicio,
    });
  };

  const repetirUltimoRegistro = async (exercicioId) => {
    try {
      setLoading(true);
      console.log();
      await RegistroAtividadeApi.repetirUltimoRegistro(exercicioId);
      throwToastSuccess('Registro salvo com sucesso.');
    } catch (error) {
      throwToastError('Erro ao tentar repetir ultimo registro do exercício.');
    } finally {
      setLoading(false);
    }
  };

  const getOptions = () => {
    const options = ['Visualizar Registros', 'Repetir ultimo Registro'];

    if (isAdmin) {
      options.splice(0, 0, 'Editar Variação'); // FAZER POSTERIORMENTE
    }

    options.push('Cancelar');

    return options;
  };

  const selectOptionsAction = (selectedIndex, item) => {
    const options = getOptions();
    const selectedOption = options[selectedIndex];

    switch (selectedOption) {
      case 'Visualizar Registros':
        redirectRegistroAtividadesCompleto(item);
        break;
      case 'Editar Variação':
        console.log('TODO: Edição de Variação');
        break;
      case 'Repetir ultimo Registro':
        repetirUltimoRegistro(item.id);
        break;
      case 'Cancelar':
        break;
    }
  };

  const renderExercicioItem = ({ item: exercicioVariacao }) => (
    <SelectableItem
      item={exercicioVariacao}
      cancelButtonIndex={isAdmin ? 3 : 2}
      options={getOptions(exercicioVariacao)}
      onActionSelected={selectOptionsAction}
      onLongPress={() => redirectRegistroAtividadesCompleto(exercicioVariacao)}
    >
      <ExercicioVariacao exercicioVariacaoData={exercicioVariacao} />
    </SelectableItem>
  );

  const renderExerciseList = () => (
    <>
      <View style={listHeader}>
        <SearchInput
          placeholder="Pesquisar neste grupo..."
          onSearch={handleSearchResults}
          initialData={exerciciosVariacoes}
          searchKeys={['nome']}
        />
      </View>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={filteredExerciciosVariacoes}
          keyExtractor={(exercicio) => exercicio.id.toString()}
          renderItem={renderExercicioItem}
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}
    </>
  );

  return (
    <View style={container}>
      {renderExerciseList()}

      {isAdmin && (
        <View style={fabContainer}>
          <AddButton onPress={redirectExercicioForm} />
        </View>
      )}
    </View>
  );
};

export default ListExercicioVariacoes;
