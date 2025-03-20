import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import AddButton from '../../components/Button/AddButton';
import ComumStyles from '../../components/Styles/ComumStyles';

import * as Api from './Api';
import GrupoMuscular from './GrupoMuscular';

const ListGruposMusculares = (props) => {
  const { Title, ListContainer } = ComumStyles;
  const [gruposMusculares, setGruposMusculares] = useState([]);
  const navigation = useNavigation();

  const fetchGruposMusculares = async () => {
    try {
      const { data } = await Api.fetchGruposMusculares();
      setGruposMusculares(data);
    } catch (error) {
      console.error('Erro ao buscar grupos musculares:', error);
      return [];
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
    <View style={ListContainer}>
      <Text style={Title}>Grupos Musculares</Text>

      <FlatList
        data={gruposMusculares}
        keyExtractor={(grupoMuscular) => grupoMuscular.id}
        renderItem={({ item: grupoMuscular }) => (
          <GrupoMuscular nome={grupoMuscular.nome} />
        )}
      />

      <View>
        <AddButton onPress={redirectGrupoMuscularForm} />
      </View>
    </View>
  );
};

export default ListGruposMusculares;
