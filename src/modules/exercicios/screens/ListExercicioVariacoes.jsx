import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import AddButton from '../../../components/Button/AddButton';
import SearchInput from '../../../components/Inputs/SearchInput';
import EmptyList from '../../../components/List/EmptyList';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import SelectableItem from '../../../components/Selectable/SelectableItem/SelectableItem';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
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
  const { id, nome, tipoExercicio } = exercicioBase;
  const [exerciciosVariacoes, setExerciciosVariacoes] = useState([]);
  const [filteredExerciciosVariacoes, setFilteredExerciciosVariacoes] =
    useState([]);
  const [loading, setLoading] = useState(false);

  const isAdmin = useIsAdmin();

  const renderEmptyList = () => <EmptyList value="exercício" />;

  const fetchExercicioVariacoes = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchExercicioVariacoes(id);
      setExerciciosVariacoes(data);
      setFilteredExerciciosVariacoes(data);
    } catch (error) {
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

  const redirectToExercicioVariacaoForm = () => {
    navigation.navigate('ExercicioVariacaoForm', {
      exercicioData: { ...exercicioBase },
    });
  };

  const handleSearchResults = (filteredData) => {
    setFilteredExerciciosVariacoes(filteredData);
  };

  const redirectRegistroAtividadesCompleto = () => {
    navigation.navigate('RegistroAtividadesCompleto', {
      exercicio: { ...exercicioBase },
    });
  };

  // TODO: repetir ultimo registro com variacaoId — requer ajuste no backend

  const getOptions = () => {
    const options = ['Visualizar Registros'];

    if (isAdmin) {
      options.splice(0, 0, 'Editar Variação'); // FAZER POSTERIORMENTE
    }

    options.push('Cancelar');

    return options;
  };

  const selectOptionsAction = (selectedIndex) => {
    const options = getOptions();
    const selectedOption = options[selectedIndex];

    switch (selectedOption) {
      case 'Visualizar Registros':
        redirectRegistroAtividadesCompleto();
        break;
      case 'Editar Variação':
        console.log('TODO: Edição de Variação');
        break;
      case 'Cancelar':
        break;
    }
  };

  const renderExercicioItem = ({ item: exercicioVariacao }) => (
    <SelectableItem
      item={exercicioVariacao}
      cancelButtonIndex={getOptions().length - 1}
      options={getOptions()}
      onActionSelected={selectOptionsAction}
      onLongPress={() => redirectRegistroAtividadesCompleto()}
    >
      <ExercicioVariacao
        exercicioVariacaoData={exercicioVariacao}
        tipoExercicio={tipoExercicio}
      />
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
          <AddButton onPress={redirectToExercicioVariacaoForm} />
        </View>
      )}
    </View>
  );
};

export default ListExercicioVariacoes;
