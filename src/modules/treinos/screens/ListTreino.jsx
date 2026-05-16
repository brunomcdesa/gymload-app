import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddButton from '../../../components/Button/AddButton';
import SearchInput from '../../../components/Inputs/SearchInput';
import EmptyList from '../../../components/List/EmptyList';
import SeparatorItem from '../../../components/List/SeparatorItem';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import SelectableItem from '../../../components/Selectable/SelectableItem/SelectableItem';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from '../style/style';

const ListTreino = () => {
  const { container } = ComumStyles;
  const {
    listContent,
    chipRow,
    chip,
    chipActive,
    chipText,
    chipTextActive,
    treinoCard,
    treinoAccentBarAtivo,
    treinoAccentBarInativo,
    treinoIconContainer,
    treinoInfo,
    treinoNome,
    treinoNomeRow,
    treinoData,
    fabRow,
    importarFabButton,
  } = style;

  const [treinos, setTreinos] = useState([]);
  const [filteredTreinos, setFilteredTreinos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [buscarInativos, setBuscarInativos] = useState(false);
  const [buscarImportados, setBuscarImportados] = useState(false);

  const fetchTreinos = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchTreinos(buscarInativos, buscarImportados);
      setTreinos(data);
      setFilteredTreinos(data);
    } catch (error) {
      throwToastError('Erro ao buscar Treinos do Usuário.');
      console.error('Erro ao buscar Treinos do Usuário.', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [buscarInativos, buscarImportados]);

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
    const opcoes = [
      'Ver Exercícios',
      'Editar Treino',
      treino.situacao === 'ATIVO' ? 'Inativar Treino' : 'Ativar Treino',
    ];
    if (treino.situacao === 'ATIVO') {
      opcoes.push('Compartilhar Treino');
    }
    opcoes.push('Cancelar');
    return opcoes;
  };

  const getCancelButtonIndex = (treino) =>
    treino.situacao === 'ATIVO' ? 4 : 3;

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
        if (item.situacao === 'ATIVO') {
          navigation.navigate('CompartilharTreino', {
            treino: { id: item.id, nome: item.nome },
          });
        }
        break;
      default:
        break;
    }
  };

  const renderTreinoItem = ({ item: treino }) => {
    const isAtivo = treino.situacao === 'ATIVO';
    return (
      <SelectableItem
        item={treino}
        cancelButtonIndex={getCancelButtonIndex(treino)}
        options={getOptions(treino)}
        onActionSelected={selectOptionsAction}
        onLongPress={() => redirectToListExerciciosTreino(treino)}
      >
        <View style={treinoCard}>
          <View
            style={[
              { width: 4, alignSelf: 'stretch', borderRadius: 4 },
              isAtivo ? treinoAccentBarAtivo : treinoAccentBarInativo,
            ]}
          />
          <View style={treinoIconContainer}>
            <MaterialIcons
              name="fitness-center"
              size={22}
              color={isAtivo ? '#28a745' : '#dc3545'}
            />
          </View>
          <View style={treinoInfo}>
            <View style={treinoNomeRow}>
              <Text style={treinoNome}>{treino.nome}</Text>
              {treino.importado && (
                <MaterialIcons
                  testID="importado-indicator"
                  name="call-received"
                  size={14}
                  color="#666"
                  style={{ marginLeft: 4 }}
                />
              )}
            </View>
            <Text style={treinoData}>
              Criado em: {treino.dataCadastro.split(' ')[0]}
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#666" />
        </View>
      </SelectableItem>
    );
  };

  const renderEmptyList = () => <EmptyList value="treino" />;

  return (
    <View style={container}>
      <SearchInput
        placeholder="Pesquisar treinos..."
        onSearch={handleSearchResults}
        initialData={treinos}
        searchKeys={['nome']}
      />

      <View style={chipRow}>
        <TouchableOpacity
          style={[chip, !buscarInativos && chipActive]}
          onPress={() => setBuscarInativos(false)}
          activeOpacity={0.8}
        >
          <MaterialIcons
            name="check-circle"
            size={14}
            color={!buscarInativos ? '#fff' : '#aaa'}
            style={{ marginRight: 4 }}
          />
          <Text style={[chipText, !buscarInativos && chipTextActive]}>
            Ativos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[chip, buscarInativos && chipActive]}
          onPress={() => setBuscarInativos(true)}
          activeOpacity={0.8}
        >
          <MaterialIcons
            name="archive"
            size={14}
            color={buscarInativos ? '#fff' : '#aaa'}
            style={{ marginRight: 4 }}
          />
          <Text style={[chipText, buscarInativos && chipTextActive]}>
            Inativos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[chip, buscarImportados && chipActive]}
          onPress={() => setBuscarImportados((prev) => !prev)}
          activeOpacity={0.8}
        >
          <MaterialIcons
            name="call-received"
            size={14}
            color={buscarImportados ? '#fff' : '#aaa'}
            style={{ marginRight: 4 }}
          />
          <Text style={[chipText, buscarImportados && chipTextActive]}>
            Importados
          </Text>
        </TouchableOpacity>

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

      <View style={fabRow}>
        <TouchableOpacity
          style={importarFabButton}
          onPress={() => navigation.navigate('ImportarTreino')}
          activeOpacity={0.8}
        >
          <MaterialIcons name="qr-code-scanner" size={24} color="#aaa" />
        </TouchableOpacity>
        <AddButton onPress={redirectToTreinoForm} />
      </View>
    </View>
  );
};

export default ListTreino;
