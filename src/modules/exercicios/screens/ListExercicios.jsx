import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AddButton from '../../../components/Button/AddButton';
import SearchInput from '../../../components/Inputs/SearchInput';
import EmptyList from '../../../components/List/EmptyList';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import SelectableItem from '../../../components/Selectable/SelectableItem/SelectableItem';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import * as GrupoMuscularApi from '../../gruposMusculares/Api';
import * as RegistroAtividadeApi from '../../registrosAtividades/Api';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import { useIsAdmin } from '../../utils/userUtils';
import * as Api from '../Api';

import Exercicio from '../components/Exercicio';
import style from '../style/style';
import { fetchDestaquesDosExercicios } from '../utils/exerciciosUtils';

const ListExercicios = () => {
  const { container, fabContainer } = ComumStyles;

  const [chips, setChips] = useState([
    { id: 'todos', label: 'Todos', tipo: 'todos', value: null },
  ]);
  const [chipSelecionado, setChipSelecionado] = useState({
    id: 'todos',
    tipo: 'todos',
    value: null,
  });
  const [exercicios, setExercicios] = useState([]);
  const [filteredExercicios, setFilteredExercicios] = useState([]);
  const [dadosRegistrosAtividades, setDadosRegistrosAtividades] = useState({});
  const [loading, setLoading] = useState(false);
  const [chipsLoading, setChipsLoading] = useState(false);

  const navigation = useNavigation();
  const isAdmin = useIsAdmin();

  const fetchChips = useCallback(async () => {
    try {
      setChipsLoading(true);
      const { data } = await GrupoMuscularApi.fetchGruposMuscularesSelect();
      const grupoChips = data.map((g) => ({
        id: `grupo_${g.value}`,
        label: g.label,
        tipo: 'grupo',
        value: g.value,
      }));
      setChips([
        { id: 'todos', label: 'Todos', tipo: 'todos', value: null },
        ...grupoChips,
        { id: 'AEROBICO', label: 'Aeróbico', tipo: 'tipo', value: 'AEROBICO' },
      ]);
    } catch {
      throwToastError('Erro ao carregar filtros.');
    } finally {
      setChipsLoading(false);
    }
  }, []);

  const fetchExercicios = useCallback(async () => {
    try {
      setLoading(true);
      const filtros = {};
      if (chipSelecionado.tipo === 'grupo')
        filtros.grupoMuscularId = chipSelecionado.value;
      if (chipSelecionado.tipo === 'tipo')
        filtros.tipoExercicio = chipSelecionado.value;
      const { data } = await Api.fetchExercicios(filtros);
      setExercicios(data);
      setFilteredExercicios(data);
      if (data && data.length > 0) {
        const ids = data.map((e) => e.id);
        await fetchDestaquesDosExercicios(ids, setDadosRegistrosAtividades);
      }
    } catch {
      throwToastError('Erro ao buscar exercícios.');
    } finally {
      setLoading(false);
    }
  }, [chipSelecionado]);

  useFocusEffect(
    useCallback(() => {
      fetchChips();
      fetchExercicios();
    }, [fetchChips, fetchExercicios]),
  );

  const handleChipPress = (chip) => {
    setChipSelecionado(chip);
  };

  const redirectExercicioForm = () => {
    navigation.navigate('ExercicioForm', {
      exercicioData: {},
      isEdicao: false,
    });
  };

  const redirectToExercicioFormEdit = (exercicio) => {
    navigation.navigate('ExercicioForm', {
      exercicioData: { ...exercicio },
      isEdicao: true,
    });
  };

  const redirectToExercicioVariacaoForm = (exercicio) => {
    navigation.navigate('ExercicioVariacaoForm', {
      exercicioData: { ...exercicio },
    });
  };

  const redirectRegistroAtividadesCompleto = (exercicio) => {
    navigation.navigate('RegistroAtividadesCompleto', {
      exercicio,
    });
  };

  const redirectToListExercicioVariacoes = (exercicio) => {
    navigation.navigate('ListExercicioVariacoes', {
      exercicioBase: { ...exercicio },
    });
  };

  const repetirUltimoRegistro = async (exercicioId) => {
    try {
      setLoading(true);
      await RegistroAtividadeApi.repetirUltimoRegistro(exercicioId);
      throwToastSuccess('Registro salvo com sucesso.');
    } catch {
      throwToastError('Erro ao tentar repetir ultimo registro do exercício.');
    } finally {
      setLoading(false);
    }
  };

  const getOptions = (item) => {
    const options = ['Visualizar Registros'];

    if (isAdmin && item.possuiVariacao) {
      options.push('Visualizar Variações');
      options.push('Adicionar Variação');
    }

    options.push('Repetir ultimo Registro');

    if (isAdmin) {
      options.splice(0, 0, 'Editar Exercício');
    }

    options.push('Cancelar');

    return options;
  };

  const selectOptionsAction = (selectedIndex, item) => {
    const options = getOptions(item);
    const selectedOption = options[selectedIndex];

    switch (selectedOption) {
      case 'Visualizar Registros':
        redirectRegistroAtividadesCompleto(item);
        break;
      case 'Editar Exercício':
        redirectToExercicioFormEdit(item);
        break;
      case 'Adicionar Variação':
        redirectToExercicioVariacaoForm(item);
        break;
      case 'Visualizar Variações':
        redirectToListExercicioVariacoes(item);
        break;
      case 'Repetir ultimo Registro':
        repetirUltimoRegistro(item.id);
        break;
      case 'Cancelar':
        break;
    }
  };

  const getCancelButtonIndex = (item) => {
    return getOptions(item).length - 1;
  };

  const renderExercicioItem = ({ item: exercicio }) => (
    <SelectableItem
      item={exercicio}
      cancelButtonIndex={getCancelButtonIndex(exercicio)}
      options={getOptions(exercicio)}
      onActionSelected={selectOptionsAction}
      onLongPress={() => redirectRegistroAtividadesCompleto(exercicio)}
    >
      <Exercicio
        exercicioData={exercicio}
        dadosRegistrosAtividades={
          dadosRegistrosAtividades[exercicio.id] || null
        }
        onViewHistorico={() => redirectRegistroAtividadesCompleto(exercicio)}
      />
    </SelectableItem>
  );

  return (
    <View style={container}>
      <SearchInput
        key={chipSelecionado.id}
        placeholder="Pesquisar exercícios..."
        onSearch={setFilteredExercicios}
        initialData={exercicios}
        searchKeys={['nome']}
      />

      {!chipsLoading && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={style.chipRow}
          style={{ flexShrink: 0 }}
        >
          {chips.map((chip) => (
            <TouchableOpacity
              key={chip.id}
              style={[
                style.chip,
                chipSelecionado.id === chip.id
                  ? style.chipAtivo
                  : style.chipInativo,
              ]}
              onPress={() => handleChipPress(chip)}
            >
              <Text
                style={
                  chipSelecionado.id === chip.id
                    ? style.chipTextAtivo
                    : style.chipText
                }
              >
                {chip.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={filteredExercicios}
          keyExtractor={(exercicio) => exercicio.id.toString()}
          renderItem={renderExercicioItem}
          ListEmptyComponent={<EmptyList value="exercício" />}
          contentContainerStyle={ComumStyles.listContent}
        />
      )}

      {isAdmin && (
        <View style={fabContainer}>
          <AddButton onPress={redirectExercicioForm} />
        </View>
      )}
    </View>
  );
};

export default ListExercicios;
