import React, { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import style from './style/style';

import { useFocusEffect } from '@react-navigation/native';
import AddButton from '../../../components/Button/AddButton';
import BackButton from '../../../components/Button/BackButton';
import ComumStyles from '../../../components/Styles/ComumStyles';
import * as Api from './Api';
import Carga from './Carga';

const HistoricoCargas = ({ route, navigation }) => {
  const { Title, Botoes } = ComumStyles;
  const { exercicioId, exercicioNome } = route.params;
  const [historicoCargas, setCargas] = useState([]);

  const fetchCargas = async () => {
    try {
      const { data } = await Api.fetchHistoricoCargas({
        exercicioId: exercicioId,
      });
      setCargas(data);
    } catch (error) {
      console.error('Erro ao buscar histórico de cargas:', error);
      return [];
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCargas();
    }, []),
  );

  const redirectToCargaForm = () => {
    navigation.navigate('CargaForm', { exercicioId, exercicioNome });
  };

  return (
    <View style={style.Container}>
      <Text style={Title}>Historico de Cargas - {exercicioNome}</Text>
      <FlatList
        data={historicoCargas}
        keyExtractor={(historico) => historico.id}
        renderItem={({ item: carga }) => <Carga {...carga} />}
      />

      <View style={Botoes}>
        <BackButton navigation={navigation} />
        <AddButton onPress={redirectToCargaForm} />
      </View>
    </View>
  );
};

export default HistoricoCargas;
