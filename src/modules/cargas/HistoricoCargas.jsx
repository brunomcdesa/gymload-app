import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import ComumStyles from '../../comum/ComumStyles';
import style from './style/style';

import * as Api from './Api';
import Carga from './Carga';

export default ({ route, navigation }) => {
  const { exercicioId, exercicioNome } = route.params;
  const [historicoCargas, setCargas] = useState([]);

  useEffect(() => {
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

    fetchCargas();
  }, []);

  return (
    <View style={style.Container}>
      <Text style={ComumStyles.Title}>
        Historico de Cargas - {exercicioNome}
      </Text>
      <FlatList
        data={historicoCargas}
        keyExtractor={(historico) => historico.id}
        renderItem={({ item: carga }) => <Carga {...carga} />}
      />
      <Button
        title="Voltar"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};
