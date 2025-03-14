import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import style from './style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default props => {

    const navigation = useNavigation();

    const redirectToHistorico = () => {
        navigation.push('HistoricoCargas', {
            exercicioId: 3,
            exercicioNome: props.nome
        });
    };

    return (
        <View style={style.Exercicio}>
            <View style={style.ExercicioContainer}>
                <Text style={style.ExercicioText}>{ props.nome }</Text>
                <Text style={style.ExercicioText}>{ props.descricao }</Text>
                <Text style={style.ExercicioText}>{ props.grupoMuscular }</Text>

                <TouchableOpacity
                    style={style.BotaoHistorico}
                    onPress={redirectToHistorico}
                >
                    <MaterialIcons name="history" size={24} color="#fff" />
                    <Text style={style.BotaoTexto}>Ver Histórico</Text>
                 </TouchableOpacity>
            </View>
        </View>
    )
}