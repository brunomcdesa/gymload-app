import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import ScreenFooter from '../../../components/Button/ScreenFooter';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import SearchInput from '../../../components/Inputs/SearchInput';
import EmptyList from '../../../components/List/EmptyList';
import SeparatorItem from '../../../components/List/SeparatorItem';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import SelectableItem from '../../../components/Selectable/SelectableItem/SelectableItem';
import { throwToastError } from '../../utils/toastUtils';
import { useIsAdmin } from '../../utils/userUtils';
import * as Api from '../Api';

import ExercicioVariacao from '../components/ExercicioVariacao';
import style from '../style/style';

const ListExercicioVariacoes = (props) => {
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
    } catch {
      throwToastError('Erro ao buscar exercícios.');
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
      headerTitleAlign: 'center',
      headerLeft: () => null,
      headerBackVisible: false,
      gestureEnabled: false,
    });
  }, [navigation, renderHeaderTitle]);

  const redirectToExercicioVariacaoForm = () => {
    navigation.navigate('ExercicioVariacaoForm', {
      exercicioData: { ...exercicioBase },
    });
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

  return (
    <View style={style.screenContainer}>
      <View style={style.listHeader}>
        <SearchInput
          placeholder="Pesquisar neste grupo..."
          onSearch={setFilteredExerciciosVariacoes}
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
          contentContainerStyle={style.listContent}
          ItemSeparatorComponent={SeparatorItem}
        />
      )}

      <ScreenFooter
        onBack={() => navigation.goBack()}
        loading={loading}
        onSave={isAdmin ? redirectToExercicioVariacaoForm : undefined}
        saveLabel="ADICIONAR"
        saveIcon="add"
      />
    </View>
  );
};

ListExercicioVariacoes.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      exercicioBase: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        nome: PropTypes.string.isRequired,
        tipoExercicio: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ListExercicioVariacoes;
