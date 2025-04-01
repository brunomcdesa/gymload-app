import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import AddButton from '../../../components/Button/AddButton';
import { ComumStyles } from '../../../components/Styles/ComumStyles';

import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import * as Api from '../Api';
import GrupoMuscular from '../GrupoMuscular';

const ListGruposMusculares = () => {
  const { Title, Container } = ComumStyles;
  const [gruposMusculares, setGruposMusculares] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchGruposMusculares = async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchGruposMusculares();
      setGruposMusculares(data);
    } catch (error) {
      console.error('Erro ao buscar grupos musculares:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchGruposMusculares();
    }, []),
  );

  const redirectGrupoMuscularForm = () => {
    navigation.navigate('GrupoMuscularForm');
  };

  return (
    <View style={Container}>
      <Text style={Title}>Grupos Musculares</Text>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={gruposMusculares}
          keyExtractor={(grupoMuscular) => grupoMuscular.id}
          renderItem={({ item: grupoMuscular }) => (
            <GrupoMuscular nome={grupoMuscular.nome} />
          )}
        />
      )}

      <View>
        <AddButton onPress={redirectGrupoMuscularForm} />
      </View>
    </View>
  );
};

export default ListGruposMusculares;
