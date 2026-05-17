import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AnimatedPressable from '../../../components/Button/AnimatedPressable';
import SearchInput from '../../../components/Inputs/SearchInput';
import EmptyList from '../../../components/List/EmptyList';
import SeparatorItem from '../../../components/List/SeparatorItem';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { ComumStyles, colors } from '../../../components/Styles/ComumStyles';
import { useScreenTitle } from '../../../hooks/useScreenTitle';
import { throwToastError } from '../../utils/toastUtils';
import * as Api from '../Api';
import GrupoMuscular from '../GrupoMuscular';

const ListGruposMusculares = () => {
  const { container, listContent } = ComumStyles;
  const [gruposMusculares, setGruposMusculares] = useState([]);
  const [filteredGruposMusculares, setFilteredGruposMusculares] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useScreenTitle('Grupos Musculares', 'Gerencie os grupos musculares');

  const fetchGruposMusculares = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchGruposMusculares();
      setGruposMusculares(data);
      setFilteredGruposMusculares(data);
    } catch {
      throwToastError('Erro ao buscar grupos musculares.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchGruposMusculares();
    }, [fetchGruposMusculares]),
  );

  const handleSearchResults = (filteredData) => {
    setFilteredGruposMusculares(filteredData);
  };

  const redirectGrupoMuscularForm = () => {
    navigation.navigate('GrupoMuscularForm');
  };

  const renderEmptyList = () => <EmptyList value="grupo muscular" />;

  return (
    <View style={container}>
      <SearchInput
        placeholder="Pesquisar grupos musculares..."
        onSearch={handleSearchResults}
        initialData={gruposMusculares}
        searchKeys={['nome']}
      />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={filteredGruposMusculares}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <GrupoMuscular nome={item.nome} />}
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={listContent}
          ItemSeparatorComponent={SeparatorItem}
        />
      )}

      <View style={ComumStyles.formFooter}>
        <AnimatedPressable
          style={ComumStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={ComumStyles.backButtonText}>Voltar</Text>
        </AnimatedPressable>
        <AnimatedPressable
          style={ComumStyles.saveButton}
          onPress={redirectGrupoMuscularForm}
        >
          <MaterialIcons
            name="add"
            size={18}
            color={colors.buttonText}
            style={ComumStyles.saveButtonIcon}
          />
          <Text style={ComumStyles.saveButtonText}>ADICIONAR</Text>
        </AnimatedPressable>
      </View>
    </View>
  );
};

export default ListGruposMusculares;
