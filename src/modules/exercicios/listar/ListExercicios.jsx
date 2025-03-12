import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import * as Api from '../Api';
import Exercicio from '../Exercicio';

export default props => {
    const [exercicios, setExercicios] = useState([]);

    useEffect(() => {
        const fetchExercicios = async () => {
            try {
                const { data } = await Api.fetchExercicios();
                console.log("Dados recebidos:", data);
                setExercicios(data);
            } catch (error) {
                console.log("Erro ao buscar exercicios:", error);
                return [];
            }
        };

        fetchExercicios();
    }, []);

    return (
        <>
            <Text>Lista de Exercicios</Text>
            <FlatList 
                data={exercicios}
                keyExtractor={exercicio => exercicio.nome}
                renderItem={({ item: exercicio }) => (
                    <Exercicio
                        nome={exercicio.nome}
                        descricao={exercicio.descricao}
                        grupoMuscular={exercicio.grupoMuscularNome}
                    />
                )}
                contentContainerStyle={style.ListContainer}
            />
        </>
    )
}

const style = StyleSheet.create({
    ListContainer: {
        padding: 10,
        backgroundColor: '#f9f9f9',
      },
})