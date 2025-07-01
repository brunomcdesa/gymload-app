import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import SearchInput from '../../../components/Inputs/SearchInput';
import EmptyList from '../../../components/List/EmptyList';
import SeparatorItem from '../../../components/List/SeparatorItem';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { throwToastError } from '../../utils/toastUtils';
import * as Api from '../Api';
import Usuario from '../components/Usuario';

const GerenciarUsuarios = (props) => {
  const { container, listContent } = ComumStyles;
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchUsuariosDoSistema = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchUsuarios();

      setUsuarios(data);
      setFilteredUsuarios(data);
    } catch (error) {
      throwToastError(
        error.data[0]?.message || 'Erro ao buscar usuários do sistema',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUsuariosDoSistema();
    }, [fetchUsuariosDoSistema]),
  );

  const renderEmptyList = () => <EmptyList value="usuário" />;

  const handleSearchResults = (filteredData) => {
    setFilteredUsuarios(filteredData);
  };

  return (
    <View style={container}>
      <SearchInput
        placeholder="Pesquisar usuários..."
        onSearch={handleSearchResults}
        initialData={usuarios}
        searchKeys={['nome']}
      />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={filteredUsuarios}
          keyExtractor={(usuario) => usuario.uuid}
          renderItem={({ item }) => (
            <Usuario item={item} navigation={navigation} />
          )}
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={listContent}
          ItemSeparatorComponent={SeparatorItem}
        />
      )}
    </View>
  );
};

export default GerenciarUsuarios;
