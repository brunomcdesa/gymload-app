import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddButton from '../../../components/Button/AddButton';
import SearchInput from '../../../components/Inputs/SearchInput';
import EmptyList from '../../../components/List/EmptyList';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import SelectableItem from '../../../components/SelectableItem/SelectableItem';
import { colors, ComumStyles } from '../../../components/Styles/ComumStyles';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from '../style/style';

const SeparatorItem = () => <View style={style.separator} />;

const ListTreino = () => {
  const {
    treinoItem,
    treinoInfo,
    treinoContainer,
    treinoData,
    treinoNome,
    emptyList,
    addButton,
    listContent,
    situacaoIndicator,
    situacaoAtiva,
    situacaoInativa,
    checkboxContainer,
    checkboxLabel,
  } = style;
  const { container } = ComumStyles;
  const [treinos, setTreinos] = useState([]);
  const [filteredTreinos, setFilteredTreinos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [buscarInativos, setBuscarInativos] = useState(false);

  const fetchTreinos = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchTreinos(buscarInativos);
      setTreinos(data);
      setFilteredTreinos(data);
    } catch (error) {
      throwToastError('Erro ao buscar Treinos do Usuário.');
      console.error('Erro ao buscar Treinos do Usuário.', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [buscarInativos]);

  useFocusEffect(
    useCallback(() => {
      fetchTreinos();
    }, [fetchTreinos]),
  );

  const redirectToTreinoForm = () => {
    navigation.navigate('TreinoForm', { treinoData: {}, isEdicao: false });
  };

  const redirectToTreinoFormEdit = (treino) => {
    navigation.navigate('TreinoForm', {
      treinoData: { ...treino },
      isEdicao: true,
    });
  };

  const redirectToListExerciciosTreino = (treino) => {
    navigation.navigate('ListExerciciosTreino', {
      treino: { id: treino.id, nome: treino.nome },
    });
  };

  const handleSearchResults = (filteredData) => {
    setFilteredTreinos(filteredData);
  };

  const toggleTreinoSituacao = async (treino) => {
    try {
      setLoading(true);
      if (treino.situacao === 'ATIVO') {
        await Api.inativarTreino(treino.id);
        throwToastSuccess(`${treino.nome} inativo com sucesso.`);
      }
      if (treino.situacao === 'INATIVO') {
        await Api.ativarTreino(treino.id);
        throwToastSuccess(`${treino.nome} ativo com sucesso.`);
      }
      await fetchTreinos();
    } catch (error) {
      throwToastError('Não foi possível alterar a situação do treino.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getOptions = (treino) => {
    return [
      'Ver Exercícios',
      'Editar Treino',
      treino.situacao === 'ATIVO' ? 'Inativar Treino' : 'Ativar Treino',
      'Cancelar',
    ];
  };

  const selectOptionsAction = (selectedIndex, item) => {
    switch (selectedIndex) {
      case 0:
        redirectToListExerciciosTreino(item);
        break;
      case 1:
        redirectToTreinoFormEdit(item);
        break;
      case 2:
        toggleTreinoSituacao(item);
        break;
      case 3:
        break;
    }
  };

  const renderTreinoItem = ({ item: treino }) => (
    <SelectableItem
      item={treino}
      cancelButtonIndex={3}
      options={getOptions(treino)}
      onActionSelected={selectOptionsAction}
      onLongPress={() => redirectToListExerciciosTreino(treino)}
    >
      <View style={treinoItem}>
        <View style={treinoInfo}>
          <View style={treinoContainer}>
            <View
              style={[
                situacaoIndicator,
                treino.situacao === 'ATIVO' ? situacaoAtiva : situacaoInativa,
              ]}
            />
            <Text style={treinoNome}>{treino.nome}</Text>
          </View>
          <Text style={treinoData}>
            Criado em: {treino.dataCadastro.split(' ')[0]}
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#aaa" />
      </View>
    </SelectableItem>
  );

  const renderEmptyList = () => <EmptyList value="treino" style={emptyList} />;

  const handleToggleInativos = async () => {
    setBuscarInativos((prev) => !prev);
  };

  return (
    <View style={container}>
      <SearchInput
        placeholder="Pesquisar treinos..."
        onSearch={handleSearchResults}
        initialData={treinos}
        searchKeys={['nome']}
      />

      <View style={checkboxContainer}>
        <Checkbox
          status={buscarInativos ? 'checked' : 'unchecked'}
          onPress={handleToggleInativos}
          color={colors.secondary}
        />
        <Text style={checkboxLabel}>Mostrar treinos inativos</Text>
      </View>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={filteredTreinos}
          keyExtractor={(treino) => treino.id.toString()}
          renderItem={renderTreinoItem}
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={listContent}
          ItemSeparatorComponent={SeparatorItem}
        />
      )}

      <AddButton onPress={redirectToTreinoForm} style={addButton} />
    </View>
  );
};

export default ListTreino;
