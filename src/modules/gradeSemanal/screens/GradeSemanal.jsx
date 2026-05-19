import { useActionSheet } from '@expo/react-native-action-sheet';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnimatedPressable from '../../../components/Button/AnimatedPressable';
import ScreenFooter from '../../../components/Button/ScreenFooter';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { colors } from '../../../components/Styles/ComumStyles';
import * as TreinosApi from '../../treinos/Api';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from '../style/style';

const DIAS = [
  { key: 'SEGUNDA', label: 'SEGUNDA', short: 'SEG', dow: 1 },
  { key: 'TERCA', label: 'TERÇA', short: 'TER', dow: 2 },
  { key: 'QUARTA', label: 'QUARTA', short: 'QUA', dow: 3 },
  { key: 'QUINTA', label: 'QUINTA', short: 'QUI', dow: 4 },
  { key: 'SEXTA', label: 'SEXTA', short: 'SEX', dow: 5 },
  { key: 'SABADO', label: 'SÁBADO', short: 'SAB', dow: 6 },
  { key: 'DOMINGO', label: 'DOMINGO', short: 'DOM', dow: 0 },
];

const GradeSemanal = ({ navigation }) => {
  const [treinos, setTreinos] = useState([]);
  const [gradePorDia, setGradePorDia] = useState({});
  const [loading, setLoading] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();
  const diaSemanaHoje = new Date().getDay();

  const renderHeaderTitle = useCallback(
    () => (
      <HeaderTitle
        title="Grade Semanal"
        subtitle="Defina um treino para cada dia"
      />
    ),
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
      headerTitleAlign: 'center',
      headerLeft: () => null,
      headerBackVisible: false,
      gestureEnabled: false,
    });
  }, [navigation, renderHeaderTitle]);

  const carregarDados = useCallback(async () => {
    try {
      setLoading(true);
      const [respGrade, respTreinos] = await Promise.all([
        Api.fetchGradeSemanal(),
        TreinosApi.fetchTreinos(false, false),
      ]);
      setTreinos(respTreinos.data || []);

      const mapa = {};
      (respGrade.data || []).forEach((item) => {
        mapa[item.diaSemana] = {
          treinoId: item.treinoId,
          treinoNome: item.treinoNome,
        };
      });
      setGradePorDia(mapa);
    } catch {
      throwToastError('Erro ao carregar a grade semanal.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [carregarDados]),
  );

  const salvarDia = async (diaKey, treino) => {
    const anterior = gradePorDia[diaKey];
    setGradePorDia((prev) => ({
      ...prev,
      [diaKey]: { treinoId: treino.id, treinoNome: treino.nome },
    }));
    try {
      await Api.salvarDia(diaKey, treino.id);
      throwToastSuccess(`${treino.nome} atribuído a ${diaKey.toLowerCase()}.`);
    } catch {
      setGradePorDia((prev) => ({ ...prev, [diaKey]: anterior }));
      throwToastError('Erro ao salvar.');
    }
  };

  const removerDia = async (diaKey) => {
    const anterior = gradePorDia[diaKey];
    setGradePorDia((prev) => {
      const next = { ...prev };
      delete next[diaKey];
      return next;
    });
    try {
      await Api.removerDia(diaKey);
      throwToastSuccess('Dia de descanso definido.');
    } catch {
      setGradePorDia((prev) => ({ ...prev, [diaKey]: anterior }));
      throwToastError('Erro ao remover.');
    }
  };

  const abrirSeletor = (diaKey, diaLabel) => {
    const options = [
      ...treinos.map((t) => t.nome),
      'Descanso',
      'Cancelar',
    ];
    const cancelButtonIndex = options.length - 1;
    const descansoIndex = options.length - 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: `Treino para ${diaLabel}`,
        tintColor: colors.textLight,
        containerStyle: { backgroundColor: colors.primary },
        textStyle: { color: colors.textLight },
        titleTextStyle: { color: colors.placeholderText },
      },
      (selectedIndex) => {
        if (selectedIndex === undefined || selectedIndex === cancelButtonIndex) {
          return;
        }
        if (selectedIndex === descansoIndex) {
          removerDia(diaKey);
          return;
        }
        salvarDia(diaKey, treinos[selectedIndex]);
      },
    );
  };

  return (
    <View style={style.screenContainer}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView contentContainerStyle={style.scrollContent}>
          <Text style={style.intro}>
            Atribua um treino ativo para cada dia da semana. Dias sem treino são
            marcados como descanso.
          </Text>

          {DIAS.map((dia) => {
            const atribuido = gradePorDia[dia.key];
            const isHoje = dia.dow === diaSemanaHoje;
            return (
              <View
                key={dia.key}
                style={[style.diaCard, isHoje && style.diaCardHoje]}
                testID={`dia-row-${dia.key}`}
              >
                <View style={style.diaLabelWrap}>
                  <Text style={style.diaLabel}>{dia.short}</Text>
                  {isHoje && <Text style={style.diaSubLabel}>HOJE</Text>}
                </View>

                <AnimatedPressable
                  testID={`dia-picker-${dia.key}`}
                  wrapperStyle={{ flex: 1 }}
                  style={style.treinoPicker}
                  onPress={() => abrirSeletor(dia.key, dia.label)}
                >
                  <Text
                    style={[
                      style.treinoPickerTexto,
                      !atribuido && style.treinoPickerTextoVazio,
                    ]}
                    numberOfLines={1}
                  >
                    {atribuido ? atribuido.treinoNome : 'Descanso'}
                  </Text>
                  <MaterialIcons
                    name="unfold-more"
                    size={20}
                    color={colors.placeholderText}
                  />
                </AnimatedPressable>
              </View>
            );
          })}
        </ScrollView>
      )}

      <ScreenFooter onBack={() => navigation.goBack()} loading={loading} />
    </View>
  );
};

GradeSemanal.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default GradeSemanal;
