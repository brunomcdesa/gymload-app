import React, { useCallback, useState } from 'react';
import { SectionList, Text, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import BackButton from '../../../../components/Button/BackButton';
import LoadingIndicator from '../../../../components/Loading/LoadingIndicator';
import { ComumStyles } from '../../../../components/Styles/ComumStyles';
import * as Api from '../Api';
import Carga from '../Carga';
import style from '../style/style';

const HistoricoCompletoCargas = (props) => {
  const { qtdSeriesText, cargaInfoContainer, dataUltimoHistoricoStyle } = style;
  const { Container, Title, Botoes } = ComumStyles;
  const { exercicioId, exercicioNome } = props.route.params;
  const [historicoCargasCompleto, setHistoricoCargasCompleto] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCargas = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchHistoricoCargasCompleto({
        exercicioId: exercicioId,
      });
      setHistoricoCargasCompleto(data);
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

  const groupCargasByDate = (cargas) => {
    const grouped = {};

    cargas.forEach((carga) => {
      const date = carga.dataCadastro.split(' ')[0];

      if (!grouped[date]) {
        grouped[date] = [];
      }

      grouped[date].push(carga);
    });

    return Object.keys(grouped).map((date) => ({
      title: date,
      data: grouped[date],
    }));
  };

  const groupedCargas = groupCargasByDate(historicoCargasCompleto);

  return (
    <View style={Container}>
      <Text style={Title}>{exercicioNome}</Text>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <SectionList
            sections={groupedCargas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item: carga }) => (
              <View style={cargaInfoContainer}>
                <Text style={qtdSeriesText}>{carga.qtdSeries}x</Text>
                <Carga carga={carga.carga} qtdRepeticoes={carga.dataCadastro} />
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={dataUltimoHistoricoStyle}>{title}</Text>
            )}
          />
        </>
      )}
      <View style={Botoes}>
        <BackButton navigation={props.navigation} />
      </View>
    </View>
  );
};

HistoricoCompletoCargas.propTypes = {
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

export default HistoricoCompletoCargas;
