import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ComumStyles } from '../../components/Styles/ComumStyles';
import style from './style/style';

const Exercicio = (props) => {
  const { id, nome, descricao, grupoMuscular } = props;
  const navigation = useNavigation();
  const { ExercicioDescricaoText, BotaoHistorico, BotaoTexto } = style;

  const { ElementContainer, SubTitle, SubSubTitle } = ComumStyles;

  const redirectToHistorico = () => {
    navigation.navigate('HistoricoCargas', {
      exercicioId: id,
      exercicioNome: nome,
    });
  };

  return (
    <View style={ElementContainer}>
      <Text style={SubTitle}>{nome}</Text>
      <Text style={SubSubTitle}>{grupoMuscular}</Text>
      <Text style={ExercicioDescricaoText}>{descricao}</Text>

      <TouchableOpacity style={BotaoHistorico} onPress={redirectToHistorico}>
        <MaterialIcons name="history" size={24} color="#fff" />
        <Text style={BotaoTexto}>Ver Cargas</Text>
      </TouchableOpacity>
    </View>
  );
};

Exercicio.propTypes = {
  id: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  descricao: PropTypes.string.isRequired,
  grupoMuscular: PropTypes.string.isRequired,
};

export default Exercicio;
