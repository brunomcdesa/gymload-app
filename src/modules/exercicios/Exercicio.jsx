import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import style from './style/style';

export default (props) => {
  const { id, nome, descricao, grupoMuscular } = props;
  const navigation = useNavigation();
  const {
    Exercicio,
    ExercicioContainer,
    ExercicioText,
    BotaoHistorico,
    BotaoTexto,
  } = style;

  const redirectToHistorico = () => {
    navigation.navigate('HistoricoCargas', {
      exercicioId: id,
      exercicioNome: nome,
    });
  };

  return (
    <View style={Exercicio}>
      <View style={ExercicioContainer}>
        <Text style={ExercicioText}>{nome}</Text>
        <Text style={ExercicioText}>{descricao}</Text>
        <Text style={ExercicioText}>{grupoMuscular}</Text>

        <TouchableOpacity style={BotaoHistorico} onPress={redirectToHistorico}>
          <MaterialIcons name="history" size={24} color="#fff" />
          <Text style={BotaoTexto}>Ver Histórico</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
