import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnuncioBanner from '../../../components/Anuncios/AnuncioBanner';
import AddButton from '../../../components/Button/AddButton';
import AnimatedPressable from '../../../components/Button/AnimatedPressable';
import SearchInput from '../../../components/Inputs/SearchInput';
import EmptyList from '../../../components/List/EmptyList';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import SelectableItem from '../../../components/Selectable/SelectableItem/SelectableItem';
import { ComumStyles, colors } from '../../../components/Styles/ComumStyles';
import { BANNER_HEIGHT } from '../../../comum/constants';
import { AuthContext } from '../../../context/AuthProvider';
import * as GrupoMuscularApi from '../../gruposMusculares/Api';
import * as RegistroAtividadeApi from '../../registrosAtividades/Api';
import {
  renderIconeGrupoMuscular,
  renderIconeTipoExercicio,
} from '../../utils/iconesUtils';
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

  const navigation = useNavigation();
  const isAdmin = useIsAdmin();
  const { user } = useContext(AuthContext);
  const isSexoFeminino = user?.sexo === 'FEMININO';

  const renderChipIcon = (chip) => {
    const color =
      chipSelecionado.id === chip.id ? colors.textLight : colors.secondary;
    if (chip.tipo === 'grupo')
      return renderIconeGrupoMuscular(chip.label, isSexoFeminino, 18, color);
    if (chip.tipo === 'tipo')
      return renderIconeTipoExercicio(chip.value, isSexoFeminino, 18, color);
    return <MaterialIcons name="apps" size={18} color={color} />;
  };

  const fetchChips = useCallback(async () => {
    try {
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
    }, [fetchChips]),
  );

  useFocusEffect(
    useCallback(() => {
      fetchExercicios();
    }, [fetchExercicios]),
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

  const renderExercicioItem = ({ item: exercicio, index }) => (
    <Animated.View
      entering={FadeInDown.delay(Math.min(index * 60, 400)).duration(350)}
    >
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
    </Animated.View>
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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.chipRow}
        style={style.chipScroll}
      >
        {chips.map((chip) => (
          <AnimatedPressable
            key={chip.id}
            style={[
              style.chip,
              chipSelecionado.id === chip.id
                ? style.chipAtivo
                : style.chipInativo,
            ]}
            onPress={() => handleChipPress(chip)}
          >
            {renderChipIcon(chip)}
            <Text
              style={
                chipSelecionado.id === chip.id
                  ? style.chipTextAtivo
                  : style.chipText
              }
            >
              {chip.label}
            </Text>
          </AnimatedPressable>
        ))}
      </ScrollView>

      {loading ? (
        <View style={[ComumStyles.flexOne, style.loadingContainer]}>
          <LoadingIndicator />
        </View>
      ) : (
        <FlatList
          style={ComumStyles.flexOne}
          data={filteredExercicios}
          keyExtractor={(exercicio) => exercicio.id.toString()}
          renderItem={renderExercicioItem}
          ListEmptyComponent={<EmptyList value="exercício" />}
          contentContainerStyle={[
            ComumStyles.listContent,
            !isAdmin && { paddingBottom: BANNER_HEIGHT },
          ]}
        />
      )}

      {isAdmin && (
        <View style={fabContainer}>
          <AddButton onPress={redirectExercicioForm} />
        </View>
      )}

      <AnuncioBanner />
    </View>
  );
};

export default ListExercicios;
