import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import AddButton from '../../../components/Button/AddButton';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { useIsAdmin } from '../../utils/userUtils';
import * as Api from '../Api';
import Exercicio from '../Exercicio';

const ListExercicios = () => {
  const { Container, Title } = ComumStyles;
  const [exercicios, setExercicios] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const isAdmin = useIsAdmin();

  const fetchExercicios = async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchExercicios();
      setExercicios(data);
    } catch (error) {
      console.error('Erro ao buscar exercicios:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchExercicios();
    }, []),
  );

  const redirectExercicioForm = () => {
    navigation.navigate('ExercicioForm');
  };

  return (
    <View style={Container}>
      <Text style={Title}>Lista de Exercicios</Text>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={exercicios}
          keyExtractor={(exercicio) => exercicio.id}
          renderItem={({ item: exercicio }) => (
            <Exercicio
              id={exercicio.id}
              nome={exercicio.nome}
              descricao={exercicio.descricao}
              grupoMuscular={exercicio.grupoMuscularNome}
            />
          )}
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
