import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import AddButton from '../../../components/Button/AddButton';
import SearchInput from '../../../components/Inputs/SearchInput';
import EmptyList from '../../../components/List/EmptyList';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import SelectableItem from '../../../components/Selectable/SelectableItem/SelectableItem';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import * as EnumApi from '../../../comum/EnumApi';
import * as GrupoMuscularApi from '../../gruposMusculares/Api';
import * as RegistroAtividadeApi from '../../registrosAtividades/Api';
import {
  renderIconeGrupoMuscular,
  renderIconeTipoExercicio,
} from '../../utils/iconesUtils';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import { useIsAdmin, useUserSexo } from '../../utils/userUtils';
import * as Api from '../Api';

import Exercicio from '../components/Exercicio';
import style from '../style/style';
import { fetchDestaquesDosExercicios } from '../utils/exerciciosUtils';

const ListExercicios = () => {
  const { container, fabContainer } = ComumStyles;
  const {
    gridScreen,
    title,
    gridButton,
    gridButtonText,
    listHeader,
    backButton,
    backButtonText,
    gridButtonInner,
  } = style;
  const [exercicios, setExercicios] = useState([]);
  const [filteredExercicios, setFilteredExercicios] = useState([]);
  const [dadosRegistrosAtividades, setDadosRegistrosAtividades] = useState({});
  const [loading, setLoading] = useState(false);
  const [showTiposExerciciosFilters, setShowTiposExerciciosFilters] =
    useState(true);
  const [showGruposMuscularesFilters, setShowGruposMuscularesFilters] =
    useState(false);
  const [tipoExercicioLoading, setTipoExercicioLoading] = useState(false);
  const [grupoMuscularLoading, setGrupoMuscularLoading] = useState(false);
  const [tiposExercicios, setTiposExercicios] = useState([]);
  const [gruposMusculares, setGruposMusculares] = useState([]);
  const [tipoExercicioSelecionado, setTipoExercicioSelecionado] =
    useState(null);
  const [grupoMuscularSelecionado, setGrupoMuscularSelecionado] =
    useState(null);
  const [filtros, setFiltros] = useState({
    tipoExercicio: tipoExercicioSelecionado,
    grupoMuscularId: grupoMuscularSelecionado,
  });

  const navigation = useNavigation();
  const isAdmin = useIsAdmin();
  const userSexo = useUserSexo();
  const userIsSexoFeminino = userSexo === 'FEMININO';

  const renderEmptyList = () => <EmptyList value="exercício" />;

  const fetchTiposExerciciosSelect = useCallback(async () => {
    try {
      setTipoExercicioLoading(true);
      const { data } = await EnumApi.fetchTiposExerciciosSelect();
      setTiposExercicios(data);
    } catch (error) {
      console.log('Erro ao buscar select de tipos de exercícios.', error);
    } finally {
      setTipoExercicioLoading(false);
    }
  }, []);

  const fetchGruposMuscularesSelect = useCallback(async () => {
    try {
      setGrupoMuscularLoading(true);
      const { data } = await GrupoMuscularApi.fetchGruposMuscularesSelect();
      setGruposMusculares(data);
    } catch (error) {
      console.log('Erro ao buscar select de grupos musculares.', error);
    } finally {
      setGrupoMuscularLoading(false);
    }
  }, []);

  const fetchExercicios = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchExercicios(filtros);
      setExercicios(data);
      setFilteredExercicios(data);

      if (data && data.length > 0) {
        const exerciciosIds = data.map((exercicio) => exercicio.id);
        await fetchDestaquesDosExercicios(
          exerciciosIds,
          setDadosRegistrosAtividades,
        );
      }
    } catch (error) {
      console.log({ ...error });
      console.error('Erro ao buscar exercicios:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  useFocusEffect(
    useCallback(() => {
      fetchTiposExerciciosSelect();
      fetchGruposMuscularesSelect();
      if (tipoExercicioSelecionado === 'AEROBICO' || grupoMuscularSelecionado) {
        fetchExercicios();
      }
    }, [
      fetchTiposExerciciosSelect,
      fetchGruposMuscularesSelect,
      tipoExercicioSelecionado,
      grupoMuscularSelecionado,
      fetchExercicios,
    ]),
  );

  const handleBackToTypes = () => {
    setTipoExercicioSelecionado(null);
    setGrupoMuscularSelecionado(null);
    setShowGruposMuscularesFilters(false);
    setShowTiposExerciciosFilters(true);
  };

  const handleTypeSelection = (tipoExercicio) => {
    setTipoExercicioSelecionado(tipoExercicio);
    setFiltros({
      tipoExercicio,
      grupoMuscularId: grupoMuscularSelecionado,
    });

    setShowTiposExerciciosFilters(false);
    if (tipoExercicio === 'MUSCULACAO' || tipoExercicio === 'CALISTENIA') {
      setShowGruposMuscularesFilters(true);
    }
  };

  const handleGrupoMuscularSelection = (grupoMuscularId) => {
    setGrupoMuscularSelecionado(grupoMuscularId);
    setFiltros({
      tipoExercicio: tipoExercicioSelecionado,
      grupoMuscularId,
    });

    setShowGruposMuscularesFilters(false);
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
      exercicioBase: { id: exercicio.id, nome: exercicio.nome },
    });
  };

  const handleSearchResults = (filteredData) => {
    setFilteredExercicios(filteredData);
  };

  const renderTipoExercicioSelector = () => {
    return tipoExercicioLoading ? (
      <LoadingIndicator />
    ) : (
      <View style={gridScreen}>
        <Text style={title}>Selecione um Tipo de Exercício</Text>
        <FlatList
          data={tiposExercicios}
          keyExtractor={(item) => item.value}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={gridButton}
              onPress={() => handleTypeSelection(item.value)}
            >
              <View style={gridButtonInner}>
                {renderIconeTipoExercicio(item.value, userIsSexoFeminino)}
                <Text style={gridButtonText}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<EmptyList value="grupo muscular" />}
        />
      </View>
    );
  };

  const renderGrupoMuscularSelector = () => {
    return grupoMuscularLoading ? (
      <LoadingIndicator />
    ) : (
      <View style={gridScreen}>
        <View style={listHeader}>
          <TouchableOpacity onPress={handleBackToTypes} style={backButton}>
            <Text style={backButtonText}>‹ Voltar</Text>
          </TouchableOpacity>
          <Text style={title}>Selecione um Grupo Muscular</Text>
        </View>
        <FlatList
          data={gruposMusculares}
          keyExtractor={(item) => item.value}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={gridButton}
              onPress={() => handleGrupoMuscularSelection(item.value)}
            >
              <View style={gridButtonInner}>
                {renderIconeGrupoMuscular(item.label, userIsSexoFeminino)}
                <Text style={gridButtonText}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<EmptyList value="grupo muscular" />}
        />
      </View>
    );
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

  const getOptions = (item) => {
    const options = [
      item.possuiVariacao ? 'Visualizar Variações' : 'Visualizar Registros',
      'Repetir ultimo Registro',
    ];

    if (isAdmin) {
      options.splice(0, 0, 'Editar Exercício');
      if (item.possuiVariacao) {
        options.splice(1, 0, 'Adicionar Variação');
      }
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
    if (isAdmin) {
      if (item.possuiVariacao) {
        return 4;
      }
      return 3;
    }
    return 2;
  };

  const renderExercicioItem = ({ item: exercicio }) => (
    <SelectableItem
      item={exercicio}
      cancelButtonIndex={getCancelButtonIndex(exercicio)}
      options={getOptions(exercicio)}
      onActionSelected={selectOptionsAction}
      onLongPress={() =>
        exercicio.possuiVariacao
          ? redirectToListExercicioVariacoes(exercicio)
          : redirectRegistroAtividadesCompleto(exercicio)
      }
    >
      <Exercicio
        exercicioData={exercicio}
        dadosRegistrosAtividades={
          dadosRegistrosAtividades[exercicio.id] || null
        }
      />
    </SelectableItem>
  );

  const renderExerciseList = () => (
    <>
      <View style={listHeader}>
        <TouchableOpacity onPress={handleBackToTypes} style={backButton}>
          <Text style={backButtonText}>‹ Voltar</Text>
        </TouchableOpacity>
        <SearchInput
          placeholder="Pesquisar neste grupo..."
          onSearch={handleSearchResults}
          initialData={exercicios}
          searchKeys={['nome']}
        />
      </View>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={filteredExercicios}
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
      {showTiposExerciciosFilters && renderTipoExercicioSelector()}
      {showGruposMuscularesFilters && renderGrupoMuscularSelector()}

      {!showGruposMuscularesFilters &&
        !showTiposExerciciosFilters &&
        renderExerciseList()}

      {isAdmin && (
        <View style={fabContainer}>
          <AddButton onPress={redirectExercicioForm} />
        </View>
      )}
    </View>
  );
};

export default ListExercicios;
