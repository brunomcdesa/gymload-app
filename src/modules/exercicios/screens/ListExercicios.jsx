import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import AddButton from '../../../components/Button/AddButton';
import SearchInput from '../../../components/Inputs/SearchInput';
import EmptyList from '../../../components/List/EmptyList';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { useIsAdmin } from '../../utils/userUtils';
import * as Api from '../Api';
import Exercicio from '../Exercicio';
import { fetchDestaquesDosExercicios } from '../utils/exerciciosUtils';

const ListExercicios = () => {
  const { container } = ComumStyles;
  const [exercicios, setExercicios] = useState([]);
  const [filteredExercicios, setFilteredExercicios] = useState([]);
  const [dadosRegistrosAtividades, setDadosRegistrosAtividades] = useState({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const isAdmin = useIsAdmin();

  const renderEmptyList = () => <EmptyList value="exercício" />;

  const fetchExercicios = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchExercicios();
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
      console.error('Erro ao buscar exercicios:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercicios();
    }, [fetchExercicios]),
  );

  const redirectExercicioForm = () => {
    navigation.navigate('ExercicioForm');
  };

  const handleSearchResults = (filteredData) => {
    setFilteredExercicios(filteredData);
  };

  return (
    <View style={container}>
      <SearchInput
        placeholder="Pesquisar exercícios..."
        onSearch={handleSearchResults}
        initialData={exercicios}
        searchKeys={['nome']}
      />

      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={filteredExercicios}
          keyExtractor={(exercicio) => exercicio.id}
          renderItem={({ item: exercicio }) => (
            <Exercicio
              exercicioData={exercicio}
              dadosRegistrosAtividades={
                dadosRegistrosAtividades[exercicio.id] || null
              }
            />
          )}
          ListEmptyComponent={renderEmptyList}
        />
      )}
      {isAdmin && (
        <View>
          <AddButton onPress={redirectExercicioForm} />
        </View>
      )}
    </View>
  );
};

export default ListExercicios;
