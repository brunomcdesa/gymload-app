import React, { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import style from './style/style';

import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import AddButton from '../../../components/Button/AddButton';
import BackButton from '../../../components/Button/BackButton';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import ComumStyles from '../../../components/Styles/ComumStyles';
import * as Api from './Api';
import Carga from './Carga';

const HistoricoCargas = (props) => {
  const { Title, Botoes } = ComumStyles;
  const { exercicioId, exercicioNome } = props.route.params;
  const [historicoCargas, setCargas] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCargas = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchHistoricoCargas({
        exercicioId: exercicioId,
      });
      setCargas(data);
    } catch (error) {
      console.error('Erro ao buscar histórico de cargas:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [exercicioId]);

  useFocusEffect(
    useCallback(() => {
      fetchCargas();
    }, [fetchCargas]),
  );

  const redirectToCargaForm = () => {
    props.navigation.navigate('CargaForm', { exercicioId, exercicioNome });
  };

  return (
    <View style={style.Container}>
      <Text style={Title}>Historico de Cargas - {exercicioNome}</Text>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={historicoCargas}
          keyExtractor={(historico) => historico.id}
          renderItem={({ item: carga }) => <Carga {...carga} />}
        />
      )}

      <View style={Botoes}>
        <BackButton navigation={props.navigation} />
        <AddButton onPress={redirectToCargaForm} />
      </View>
    </View>
  );
};

HistoricoCargas.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      exercicioId: PropTypes.number.isRequired,
      exercicioNome: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default HistoricoCargas;
