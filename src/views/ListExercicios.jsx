import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import ComumStyles from '../comum/ComumStyles';
import * as Api from '../modules/exercicios/Api';
import Exercicio from '../modules/exercicios/Exercicio';
import style from './style/style';

const ListExercicios = () => {
  const [exercicios, setExercicios] = useState([]);

  const fetchExercicios = async () => {
    try {
      const { data } = await Api.fetchExercicios();
      setExercicios(data);
    } catch (error) {
      console.error('Erro ao buscar exercicios:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchExercicios();
  }, []);

  return (
    <View style={style.ListContainer}>
      <Text style={ComumStyles.Title}>Lista de Exercicios</Text>
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
    </View>
  );
};

export default ListExercicios;
