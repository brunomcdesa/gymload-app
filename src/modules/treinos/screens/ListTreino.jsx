import { useActionSheet } from '@expo/react-native-action-sheet';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddButton from '../../../components/Button/AddButton';
import SearchInput from '../../../components/Inputs/SearchInput';
import EmptyList from '../../../components/List/EmptyList';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { colors, ComumStyles } from '../../../components/Styles/ComumStyles';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from '../style/style';

const ListTreino = () => {
  const {
    treinoItem,
    treinoInfo,
    treinoData,
    treinoNome,
    emptyList,
    searchInput,
    separator,
    addButton,
    listContent,
    situacaoIndicator,
    situacaoAtiva,
    situacaoInativa,
    checkboxContainer,
    checkboxLabel,
  } = style;
  const {
    container,
    actionSheetContainer,
    actionSheetButtonText,
    actionSheetTitle,
    actionSheetMessage,
  } = ComumStyles;
  const [treinos, setTreinos] = useState([]);
  const [filteredTreinos, setFilteredTreinos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { showActionSheetWithOptions } = useActionSheet();
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
      }
      if (treino.situacao === 'INATIVO') {
        await Api.ativarTreino(treino.id);
      }
      throwToastSuccess(
        `Situação do treino ${treino.nome} alterada com sucesso`,
      );
      fetchTreinos();
    } catch (error) {
      throwToastError('Não foi possível alterar a situação do treino.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTreinoPress = (treino) => {
    const options = [
      'Ver Exercícios',
      treino.situacao === 'ATIVO' ? 'Inativar Treino' : 'Ativar Treino',
      'Cancelar',
    ];

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 2,
        destructiveButtonIndex: 2,
        title: `Opções para ${treino.nome}`,
        message: 'Escolha uma ação para este treino',
        tintColor: colors.textLight,
        containerStyle: actionSheetContainer,
        textStyle: actionSheetButtonText,
        titleTextStyle: actionSheetTitle,
        messageTextStyle: actionSheetMessage,
        separatorStyle: {
          backgroundColor: '#383838',
        },
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            redirectToListExerciciosTreino(treino);
            break;
          case 1:
            toggleTreinoSituacao(treino);
            break;
          case 2:
            break;
        }
      },
    );
  };

  const renderTreinoItem = ({ item: treino }) => (
    <TouchableOpacity
      onPress={() => handleTreinoPress(treino)}
      activeOpacity={0.7}
      onLongPress={() => redirectToListExerciciosTreino(treino)}
    >
      <View style={treinoItem}>
        <View style={treinoInfo}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
    </TouchableOpacity>
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
        style={searchInput}
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
          ItemSeparatorComponent={() => <View style={separator} />}
        />
      )}

      <AddButton onPress={redirectToTreinoForm} style={addButton} />
    </View>
  );
};

export default ListTreino;
