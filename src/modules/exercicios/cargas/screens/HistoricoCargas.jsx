import React, { useCallback, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import AddButton from '../../../../components/Button/AddButton';
import BackButton from '../../../../components/Button/BackButton';
import LoadingIndicator from '../../../../components/Loading/LoadingIndicator';
import { ComumStyles } from '../../../../components/Styles/ComumStyles';
import * as Api from '../Api';
import Carga from '../Carga';
import style from '../style/style';

const HistoricoCargas = (props) => {
  const {
    maiorCargaContainer,
    maiorCargaTitle,
    maiorCargaValue,
    qtdSeriesText,
    cargaInfoContainer,
    dataUltimoHistoricoStyle,
    HistoricoCompletoButtonStyle,
  } = style;
  const { Container, Title, Botoes } = ComumStyles;
  const { exercicioId, exercicioNome } = props.route.params;
  const [ultimoHistoricoCargas, setUltimoHistoricoCargas] = useState([]);
  const [maiorCarga, setMaiorCarga] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCargas = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchUltimoHistoricoCargas({
        exercicioId: exercicioId,
      });
      setMaiorCarga(data.maiorCarga);
      setUltimoHistoricoCargas(data.historicoCargas);
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

  const redirectToHistoricoCompletoCargas = () => {
    props.navigation.navigate('HistoricoCompletoCargas', {
      exercicioId,
      exercicioNome,
    });
  };

  return (
    <View style={Container}>
      <Text style={Title}>{exercicioNome}</Text>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {maiorCarga && (
            <View style={maiorCargaContainer}>
              <Text style={maiorCargaTitle}>Maior Carga Registrada:</Text>
              <Text style={maiorCargaValue}>{`${maiorCarga} (KG)`}</Text>
            </View>
          )}
          {ultimoHistoricoCargas?.length > 0 && (
            <>
              <Text style={dataUltimoHistoricoStyle}>
                {ultimoHistoricoCargas[0]?.dataCadastro}
              </Text>
              <FlatList
                data={ultimoHistoricoCargas}
                keyExtractor={(historico) => historico.id}
                renderItem={({ item: carga }) => (
                  <View style={cargaInfoContainer}>
                    <Text style={qtdSeriesText}>{carga.qtdSeries}x</Text>
                    <Carga
                      carga={carga.carga}
                      qtdRepeticoes={carga.dataCadastro}
                    />
                  </View>
                )}
              />
            </>
          )}
        </>
      )}

      <View style={Botoes}>
        <BackButton navigation={props.navigation} />

        <TouchableOpacity
          style={HistoricoCompletoButtonStyle}
          onPress={redirectToHistoricoCompletoCargas}
          activeOpacity={0.7}
        >
          <Text>Histórico completo</Text>
        </TouchableOpacity>

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
