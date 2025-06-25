import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import EmptyList from '../../../components/List/EmptyList';
import SeparatorItem from '../../../components/List/SeparatorItem';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { throwToastError } from '../../utils/toastUtils';
import * as Api from '../Api';

const GerenciarUsuarios = (props) => {
  const { container, listContent } = ComumStyles;
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsuariosDoSistema = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchUsuarios();
      console.log(data);
      setUsuarios(data);
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

  const renderEmptyList = () => <EmptyList value="treino" />;

  return (
    <View style={container}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(usuario) => usuario.uuid}
          renderItem={() => {}}
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={listContent}
          ItemSeparatorComponent={SeparatorItem}
        />
      )}
    </View>
  );
};

export default GerenciarUsuarios;
