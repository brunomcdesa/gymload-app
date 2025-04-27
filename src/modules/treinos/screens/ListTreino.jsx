import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddButton from '../../../components/Button/AddButton';
import SearchInput from '../../../components/Inputs/SearchInput';
import EmptyList from '../../../components/List/EmptyList';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import * as Api from '../Api';
import style from '../style/style';

const ListTreino = () => {
  const {
    header,
    title,
    subtitle,
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
  } = style;
  const { container } = ComumStyles;
  const [treinos, setTreinos] = useState([]);
  const [filteredTreinos, setFilteredTreinos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchTreinos = async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchTreinos();
      setTreinos(data);
      setFilteredTreinos(data);
    } catch (error) {
      console.error('Erro ao buscar Treinos do Usuário.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTreinos();
    }, []),
  );

  const redirectToTreinoForm = () => {
    navigation.navigate('TreinoForm', { treinoData: {}, isEdicao: false });
  };

  const redirectToListExerciciosTreino = (treino) => {
    navigation.navigate('ListExerciciosTreino', {
      treino: { id: treino.id, nome: treino.nome },
      onTreinoAtualizado: fetchTreinos,
    });
  };

  const handleSearchResults = (filteredData) => {
    setFilteredTreinos(filteredData);
  };

  const renderTreinoItem = ({ item: treino }) => (
    <TouchableOpacity
      onPress={() => redirectToListExerciciosTreino(treino)}
      activeOpacity={0.7}
    >
      <View style={treinoItem}>
        <View style={treinoInfo}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Indicador de status */}
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

  return (
    <View style={container}>
      <View style={header}>
        <Text style={title}>Meus Treinos</Text>
        <Text style={subtitle}>Gerencie seus treinos cadastrados</Text>
      </View>

      <SearchInput
        placeholder="Pesquisar treinos..."
        onSearch={handleSearchResults}
        initialData={treinos}
        searchKeys={['nome']}
        style={searchInput}
      />

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
