import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import AddButton from '../../components/Button/AddButton';
import LoadingIndicator from '../../components/Loading/LoadingIndicator';
import { ComumStyles } from '../../components/Styles/ComumStyles';
import * as Api from './Api';
import Treino from './Treino';

const ListTreino = (props) => {
  const { Container, Title } = ComumStyles;
  const [treinos, setTreinos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchTreinos = async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchTreinos();
      setTreinos(data);
    } catch (error) {
      console.error('Erro ao buscar Treinos do Uusário.');
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
    navigation.navigate('TreinoForm');
  };

  return (
    <View style={Container}>
      <Text style={Title}>Lista de Treinos</Text>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={treinos}
          keyExtractor={(treino) => treino.id}
          renderItem={({ item: treino }) => (
            <Treino
              id={treino.id}
              nome={treino.nome}
              dataCadastro={treino.dataCadastro}
            />
          )}
        />
      )}
      <View>
        <AddButton onPress={redirectToTreinoForm} />
      </View>
    </View>
  );
};

export default ListTreino;
