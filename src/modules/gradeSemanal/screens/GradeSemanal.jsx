import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import AnimatedPressable from '../../../components/Button/AnimatedPressable';
import ScreenFooter from '../../../components/Button/ScreenFooter';
import ConfirmDialog from '../../../components/Dialog/ConfirmDialog';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from '../style/style';

const DIAS = [
  { key: 'SEGUNDA', short: 'SEG' },
  { key: 'TERCA', short: 'TER' },
  { key: 'QUARTA', short: 'QUA' },
  { key: 'QUINTA', short: 'QUI' },
  { key: 'SEXTA', short: 'SEX' },
  { key: 'SABADO', short: 'SAB' },
  { key: 'DOMINGO', short: 'DOM' },
];

const GradeSemanal = ({ navigation, route = { params: {} } }) => {
  const treino = route?.params?.treino ?? null;

  const [selectedDias, setSelectedDias] = useState([]);
  const [ocupadosPorOutros, setOcupadosPorOutros] = useState({});
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState({
    visible: false,
    message: '',
    onConfirm: null,
  });

  const closeDialog = () => setDialog((d) => ({ ...d, visible: false }));

  const renderHeaderTitle = useCallback(
    () => (
      <HeaderTitle
        title="Dias do Treino"
        subtitle={treino?.nome ?? ''}
      />
    ),
    [treino],
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
      const { data } = await Api.fetchGradeSemanal();
      const dias = (data || [])
        .filter((d) => d.treinoId === treino?.id)
        .map((d) => d.diaSemana);
      setSelectedDias(dias);
      const ocupados = {};
      (data || [])
        .filter((d) => d.treinoId !== null && d.treinoId !== treino?.id)
        .forEach((d) => {
          ocupados[d.diaSemana] = d.treinoNome;
        });
      setOcupadosPorOutros(ocupados);
    } catch {
      throwToastError('Erro ao carregar a grade semanal.');
    } finally {
      setLoading(false);
    }
  }, [treino]);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [carregarDados]),
  );

  const toggleDiaTreino = (diaKey) => {
    const isSelected = selectedDias.includes(diaKey);

    const doSalvar = async () => {
      setSelectedDias((prev) => [...prev, diaKey]);
      setOcupadosPorOutros((prev) => {
        const next = { ...prev };
        delete next[diaKey];
        return next;
      });
      try {
        await Api.salvarDia(diaKey, treino.id);
        throwToastSuccess('Dia adicionado ao treino.');
      } catch {
        setSelectedDias((prev) => prev.filter((d) => d !== diaKey));
        throwToastError('Erro ao salvar.');
      }
    };

    const doRemover = async () => {
      setSelectedDias((prev) => prev.filter((d) => d !== diaKey));
      try {
        await Api.removerDia(diaKey);
        throwToastSuccess('Dia removido do treino.');
      } catch {
        setSelectedDias((prev) => [...prev, diaKey]);
        throwToastError('Erro ao salvar.');
      }
    };

    if (isSelected) {
      doRemover();
      return;
    }

    const nomeOcupante = ocupadosPorOutros[diaKey];
    if (nomeOcupante) {
      setDialog({
        visible: true,
        message: `Este dia já pertence ao treino "${nomeOcupante}". Deseja substituir?`,
        onConfirm: doSalvar,
      });
    } else {
      doSalvar();
    }
  };

  return (
    <View style={style.screenContainer}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView contentContainerStyle={style.scrollContent}>
          <Text style={style.intro}>
            Selecione os dias em que este treino será realizado.
          </Text>
          <View style={style.diasChipRow}>
            {DIAS.map((dia) => {
              const isSelected = selectedDias.includes(dia.key);
              const isOccupied = Boolean(ocupadosPorOutros[dia.key]);
              return (
                <AnimatedPressable
                  key={dia.key}
                  testID={`dia-toggle-${dia.key}`}
                  style={[
                    style.diaToggleChip,
                    isSelected && style.diaToggleChipSelected,
                    isOccupied && !isSelected && style.diaToggleChipOccupied,
                  ]}
                  onPress={() => toggleDiaTreino(dia.key)}
                >
                  <Text
                    style={[
                      style.diaToggleChipText,
                      isSelected && style.diaToggleChipTextSelected,
                    ]}
                  >
                    {dia.short}
                  </Text>
                </AnimatedPressable>
              );
            })}
          </View>
          {Object.keys(ocupadosPorOutros).length > 0 && (
            <Text style={style.ocupadoLegenda}>
              Borda dourada = dia atribuído a outro treino
            </Text>
          )}
        </ScrollView>
      )}

      <ConfirmDialog
        visible={dialog.visible}
        title="Dia já atribuído"
        message={dialog.message}
        confirmLabel="Substituir"
        onConfirm={() => {
          closeDialog();
          dialog.onConfirm?.();
        }}
        onCancel={closeDialog}
      />

      <ScreenFooter onBack={() => navigation.goBack()} loading={loading} />
    </View>
  );
};

GradeSemanal.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      treino: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nome: PropTypes.string.isRequired,
      }),
    }),
  }),
};

export default GradeSemanal;
