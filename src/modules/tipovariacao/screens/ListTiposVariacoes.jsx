import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SearchInput from '../../../components/Inputs/SearchInput';
import EmptyList from '../../../components/List/EmptyList';
import SeparatorItem from '../../../components/List/SeparatorItem';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { ComumStyles, colors } from '../../../components/Styles/ComumStyles';
import { useScreenTitle } from '../../../hooks/useScreenTitle';
import { throwToastError } from '../../utils/toastUtils';
import * as Api from '../Api';
import TipoVariacao from '../components/TipoVariacao';

const ListTiposVariacoes = () => {
  const { container, listContent } = ComumStyles;
  const [tiposVariacoes, setTiposVariacoes] = useState([]);
  const [filteredTiposVariacoes, setFilteredTiposVariacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useScreenTitle('Tipos de Variações', 'Gerencie os tipos de variação');

  const fetchTiposVariacoes = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchTiposVariacoes();
      setTiposVariacoes(data);
      setFilteredTiposVariacoes(data);
    } catch (error) {
      throwToastError('Erro ao buscar tipos de variação.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTiposVariacoes();
    }, [fetchTiposVariacoes]),
  );

  const handleSearchResults = (filteredData) => {
    setFilteredTiposVariacoes(filteredData);
  };

  const redirectToForm = (tipoVariacaoData = null) => {
    navigation.navigate('TipoVariacaoForm', {
      tipoVariacaoData,
      isEdicao: tipoVariacaoData !== null,
    });
  };

  const renderEmptyList = () => <EmptyList value="tipo de variação" />;

  return (
    <View style={container}>
      <SearchInput
        placeholder="Pesquisar tipos de variação..."
        onSearch={handleSearchResults}
        initialData={tiposVariacoes}
        searchKeys={['nome']}
      />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={filteredTiposVariacoes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TipoVariacao item={item} onEditar={redirectToForm} />
          )}
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={listContent}
          ItemSeparatorComponent={SeparatorItem}
        />
      )}

      <View style={ComumStyles.formFooter}>
        <TouchableOpacity
          testID="btn-voltar"
          style={ComumStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={ComumStyles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="btn-adicionar"
          style={ComumStyles.saveButton}
          onPress={() => redirectToForm()}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name="add"
            size={18}
            color={colors.buttonText}
            style={ComumStyles.saveButtonIcon}
          />
          <Text style={ComumStyles.saveButtonText}>ADICIONAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListTiposVariacoes;
