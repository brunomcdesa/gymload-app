import React, { useCallback, useState } from 'react';
import { SectionList, Text, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BackButton from '../../../../components/Button/BackButton';
import LoadingIndicator from '../../../../components/Loading/LoadingIndicator';
import { colors, ComumStyles } from '../../../../components/Styles/ComumStyles';
import * as Api from '../Api';
import style from '../style/style';
import RegistroCarga from './RegistroCarga';

const RegistroAtividadesCompleto = (props) => {
  const {
    header,
    title,
    subtitle,
    listContent,
    cargaContainer,
    cargaItem,
    seriesContainer,
    cargaValue,
    seriesText,
    sectionHeader,
    sectionHeaderText,
    footer,
  } = style;
  const { container } = ComumStyles;
  const { exercicioId, exercicioNome } = props.route.params;
  const [historicoCargasCompleto, setHistoricoCargasCompleto] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCargas = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchRegistroAtividadeCompleto({
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
    <View style={container}>
      <View style={header}>
        <Text style={title}>{exercicioNome}</Text>
        <Text style={subtitle}>Registro Completo</Text>
      </View>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <SectionList
          sections={groupedCargas}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={listContent}
          renderItem={({ item: carga }) => (
            <View style={cargaItem}>
              <View style={seriesContainer}>
                <MaterialIcons
                  name="repeat"
                  size={18}
                  color={colors.secondary}
                />
                <Text style={seriesText}>{carga.qtdSeries}x</Text>
              </View>

              <View style={cargaContainer}>
                <RegistroCarga
                  carga={carga.carga}
                  qtdRepeticoes={carga.qtdRepeticoes}
                  style={cargaValue}
                />
              </View>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={sectionHeader}>
              <Text style={sectionHeaderText}>{title}</Text>
            </View>
          )}
        />
      )}

      <View style={footer}>
        <BackButton navigation={props.navigation} />
      </View>
    </View>
  );
};

RegistroAtividadesCompleto.propTypes = {
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

export default RegistroAtividadesCompleto;
