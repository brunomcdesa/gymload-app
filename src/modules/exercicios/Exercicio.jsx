import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import style from './style';

export default props => {
    return (
        <>
            <View style={style.Exercicio}>
                <View style={style.ExercicioContainer}>
                    <Text style={style.ExercicioText}>{ props.nome }</Text>
                    <Text style={style.ExercicioText}>{ props.descricao }</Text>
                    <Text style={style.ExercicioText}>{ props.grupoMuscular }</Text>
                </View>
            </View>
        </>
    )
}