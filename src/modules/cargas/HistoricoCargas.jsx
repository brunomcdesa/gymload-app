import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text } from 'react-native';

import * as Api from './Api';
import Carga from './Carga';

export default (props) => {
  const [historicoCargas, setCargas] = useState([]);

  useEffect(() => {
    const fetchCargas = async () => {
      try {
        const { data } = await Api.fetchHistoricoCargas(props.exercicioId);
        setCargas(data);
      } catch (error) {
        console.error('Erro ao buscar exercicios:', error);
        return [];
      }
    };

    fetchCargas();
  }, []);

  return (
    <>
      <Text>Historico de Cargas - {props.exercicioNome}</Text>
      <FlatList
        data={historicoCargas}
        keyExtractor={(historico) => historico.carga}
        renderItem={({ item: carga }) => <Carga {...carga} />}
      />
      <Button
        title="Voltar"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
    </>
  );
};
