import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnimatedPressable from '../../../components/Button/AnimatedPressable';
import ScreenFooter from '../../../components/Button/ScreenFooter';
import ConfirmDialog from '../../../components/Dialog/ConfirmDialog';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import TextoInput from '../../../components/Inputs/TextoInput';
import EmptyList from '../../../components/List/EmptyList';
import SeparatorItem from '../../../components/List/SeparatorItem';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { ComumStyles, colors } from '../../../components/Styles/ComumStyles';
import { AuthContext } from '../../../context/AuthProvider';
import * as ExercicioApi from '../../exercicios/Api';
import * as GradeSemanalApi from '../../gradeSemanal/Api';
import * as GrupoMuscularApi from '../../gruposMusculares/Api';
import {
  renderIconeGrupoMuscular,
  renderIconeTipoExercicio,
} from '../../utils/iconesUtils';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from '../style/style';

const CHIP_TODOS = { id: 'todos', label: 'Todos', tipo: 'todos', value: null };

const DIAS_SEMANA = [
  { key: 'SEGUNDA', label: 'SEG' },
  { key: 'TERCA', label: 'TER' },
  { key: 'QUARTA', label: 'QUA' },
  { key: 'QUINTA', label: 'QUI' },
  { key: 'SEXTA', label: 'SEX' },
  { key: 'SABADO', label: 'SAB' },
  { key: 'DOMINGO', label: 'DOM' },
];

const TreinoForm = ({ navigation, route }) => {
  const { asteriscoObrigatorio } = ComumStyles;
  const { treinoData, isEdicao } = route.params;
  const { user } = useContext(AuthContext);
  const isSexoFeminino = user?.sexo === 'FEMININO';
  const { id, nome, exerciciosIds } = treinoData;

  const [formData, setFormData] = useState({
    nome: nome || null,
    exerciciosIds: exerciciosIds || [],
  });
  const [exerciciosSelect, setExerciciosSelect] = useState([]);
  const [exerciciosSelectLoading, setExerciciosSelectLoading] = useState(false);
  const [selectedExercicios, setSelectedExercicios] = useState(
    exerciciosIds || [],
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [chips, setChips] = useState([CHIP_TODOS]);
  const [chipSelecionado, setChipSelecionado] = useState(CHIP_TODOS);
  const [chipsLoading, setChipsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDias, setSelectedDias] = useState([]);
  const [originalDias, setOriginalDias] = useState([]);
  const [gradeCompleta, setGradeCompleta] = useState([]);
  const [dialog, setDialog] = useState({
    visible: false,
    message: '',
    onConfirm: null,
  });

  const closeDialog = () => setDialog((d) => ({ ...d, visible: false }));

  const filteredExercicios = useMemo(() => {
    let items = exerciciosSelect;
    if (chipSelecionado.tipo === 'grupo') {
      items = items.filter(
        (ex) => Number(ex.grupoMuscularId) === Number(chipSelecionado.value),
      );
    } else if (chipSelecionado.tipo === 'tipo') {
      items = items.filter((ex) => ex.tipoExercicio === chipSelecionado.value);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      items = items.filter((ex) => ex.label.toLowerCase().includes(q));
    }
    return items;
  }, [exerciciosSelect, chipSelecionado, searchQuery]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleExercicio = useCallback((exercicioId) => {
    setSelectedExercicios((prev) => {
      const next = prev.includes(exercicioId)
        ? prev.filter((itemId) => itemId !== exercicioId)
        : [...prev, exercicioId];
      setFormData((prevForm) => ({ ...prevForm, exerciciosIds: next }));
      return next;
    });
  }, []);

  const toggleDia = useCallback((diaKey) => {
    setSelectedDias((prev) =>
      prev.includes(diaKey) ? prev.filter((d) => d !== diaKey) : [...prev, diaKey],
    );
  }, []);

  const fetchChips = useCallback(async () => {
    try {
      setChipsLoading(true);
      const { data } = await GrupoMuscularApi.fetchGruposMuscularesSelect();
      const grupoChips = data.map((g) => ({
        id: `grupo_${g.value}`,
        label: g.label,
        tipo: 'grupo',
        value: g.value,
      }));
      setChips([
        CHIP_TODOS,
        ...grupoChips,
        { id: 'AEROBICO', label: 'Aeróbico', tipo: 'tipo', value: 'AEROBICO' },
      ]);
    } catch {
      throwToastError('Erro ao carregar filtros.');
    } finally {
      setChipsLoading(false);
    }
  }, []);

  const fetchExerciciosSelect = useCallback(async () => {
    try {
      setExerciciosSelectLoading(true);
      const { data } = await ExercicioApi.fetchExercicios({});
      setExerciciosSelect(
        data.map((ex) => ({
          value: ex.id,
          label: ex.nome,
          tipoExercicio: ex.tipoExercicio,
          grupoMuscularId: ex.grupoMuscularId ?? null,
        })),
      );
    } catch {
      throwToastError('Erro ao carregar exercícios.');
    } finally {
      setExerciciosSelectLoading(false);
    }
  }, []);

  const fetchExerciciosDoTreino = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await ExercicioApi.fetchExerciciosDoTreino(id);
      const ids = data.map((exercicio) => exercicio.id);
      setSelectedExercicios(ids);
      setFormData((prev) => ({ ...prev, exerciciosIds: ids }));
    } catch {
      throwToastError('Erro ao buscar exercícios do treino.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchGradeParaForm = useCallback(async () => {
    try {
      const { data } = await GradeSemanalApi.fetchGradeSemanal();
      setGradeCompleta(data);
      if (isEdicao) {
        const diasDoTreino = data
          .filter((d) => d.treinoId === id)
          .map((d) => d.diaSemana);
        setSelectedDias(diasDoTreino);
        setOriginalDias(diasDoTreino);
      }
    } catch {
      throwToastError('Erro ao carregar grade semanal.');
    }
  }, [id, isEdicao]);

  const saveDias = async (treinoId) => {
    const diasParaRemover = originalDias.filter((d) => !selectedDias.includes(d));
    await Promise.all([
      ...selectedDias.map((dia) => GradeSemanalApi.salvarDia(dia, treinoId)),
      ...diasParaRemover.map((dia) => GradeSemanalApi.removerDia(dia)),
    ]);
  };

  const getConflicts = (treinoId) =>
    selectedDias.filter((dia) => {
      const entry = gradeCompleta.find((g) => g.diaSemana === dia);
      return entry && entry.treinoId !== null && entry.treinoId !== treinoId;
    });

  const handleSubmit = async () => {
    if (!formData.nome?.trim()) return throwToastError('Nome é obrigatório.');
    if (!formData.exerciciosIds?.length)
      return throwToastError('Selecione ao menos um exercício.');

    const doSave = async () => {
      try {
        setLoading(true);
        let treinoId;
        if (isEdicao) {
          await Api.editarTreinos({ id, request: formData });
          treinoId = id;
        } else {
          const { data } = await Api.saveTreinos(formData);
          treinoId = data.id;
        }
        await saveDias(treinoId);
        throwToastSuccess('Treino salvo com sucesso!');
        handleGoBack();
      } catch {
        throwToastError('Erro ao salvar treino.');
      } finally {
        setLoading(false);
      }
    };

    const pendingTreinoId = isEdicao ? id : null;
    const conflicts = getConflicts(pendingTreinoId);
    if (conflicts.length > 0) {
      const labels = conflicts
        .map((dia) => {
          const entry = gradeCompleta.find((g) => g.diaSemana === dia);
          const diaLabel = DIAS_SEMANA.find((d) => d.key === dia)?.label;
          return `${diaLabel} (${entry.treinoNome})`;
        })
        .join(', ');
      setDialog({
        visible: true,
        message: `${labels} já têm treinos. Substituir?`,
        onConfirm: doSave,
      });
    } else {
      await doSave();
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchChips();
      fetchExerciciosSelect();
      fetchGradeParaForm();
      if (isEdicao) {
        fetchExerciciosDoTreino();
      }
    }, [fetchChips, fetchExerciciosSelect, fetchExerciciosDoTreino, fetchGradeParaForm, isEdicao]),
  );

  const renderHeaderTitle = useCallback(
    () => (
      <HeaderTitle
        title={isEdicao ? 'Editar Treino' : 'Adicionar Treino'}
        isForm={true}
      />
    ),
    [isEdicao],
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

  const handleGoBack = () => {
    if (isEdicao) {
      navigation.navigate('ListExerciciosTreino', {
        treino: { id, nome },
      });
    } else {
      navigation.goBack();
    }
  };

  const renderChipIcon = (chip, isActive) => {
    const color = isActive ? colors.textLight : colors.placeholderText;
    if (chip.tipo === 'grupo')
      return renderIconeGrupoMuscular(chip.label, isSexoFeminino, 18);
    if (chip.tipo === 'tipo')
      return renderIconeTipoExercicio(chip.value, isSexoFeminino, 18);
    return <MaterialIcons name="apps" size={18} color={color} />;
  };

  const renderExercicioItem = useCallback(
    ({ item }) => {
      const isSelected = selectedExercicios.includes(item.value);
      return (
        <AnimatedPressable
          style={[style.exerciseItem, isSelected && style.exerciseItemSelected]}
          onPress={() => handleToggleExercicio(item.value)}
        >
          <MaterialIcons
            name={isSelected ? 'check-box' : 'check-box-outline-blank'}
            size={22}
            color={isSelected ? colors.secondary : colors.terciary}
          />
          <Text style={style.exerciseItemText}>{item.label}</Text>
        </AnimatedPressable>
      );
    },
    [selectedExercicios, handleToggleExercicio],
  );

  return (
    <View style={style.screenContainer}>
      <ScrollView
        contentContainerStyle={style.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={style.fieldContainer}>
          <Text style={style.fieldLabel}>
            Nome <Text style={asteriscoObrigatorio}>*</Text>
          </Text>
          <TextoInput
            placeholder="Digite o nome do treino"
            value={formData.nome}
            onChangeText={(v) => handleChange('nome', v)}
          />
        </View>

        <View style={style.fieldContainer}>
          <Text style={style.fieldLabel}>Dias da semana</Text>
          <View style={style.diasRow}>
            {DIAS_SEMANA.map(({ key, label }) => {
              const isSelected = selectedDias.includes(key);
              const occupyEntry = gradeCompleta.find((g) => g.diaSemana === key);
              const isOccupied =
                occupyEntry &&
                occupyEntry.treinoId !== null &&
                occupyEntry.treinoId !== (isEdicao ? id : null);
              return (
                <AnimatedPressable
                  key={key}
                  testID={`dia-chip-${key}`}
                  style={[
                    style.diaChip,
                    isSelected && style.diaChipSelected,
                    isOccupied && !isSelected && style.diaChipOccupied,
                  ]}
                  onPress={() => toggleDia(key)}
                >
                  <Text
                    style={[
                      style.diaChipText,
                      isSelected && style.diaChipTextSelected,
                    ]}
                  >
                    {label}
                  </Text>
                </AnimatedPressable>
              );
            })}
          </View>
          {gradeCompleta.some(
            (g) =>
              g.treinoId !== null && g.treinoId !== (isEdicao ? id : null),
          ) && (
            <Text style={style.diasLegenda} testID="dias-legenda">
              Borda dourada = dia atribuído a outro treino
            </Text>
          )}
        </View>

        <View style={style.fieldContainer}>
          <View style={style.fieldLabelRow}>
            <Text style={style.fieldLabel}>
              Exercícios <Text style={asteriscoObrigatorio}>*</Text>
            </Text>
            {selectedExercicios.length > 0 && (
              <View style={style.counterBadge}>
                <Text style={style.counterBadgeText}>
                  {selectedExercicios.length} selecionado
                  {selectedExercicios.length !== 1 ? 's' : ''}
                </Text>
              </View>
            )}
          </View>

          <TextoInput
            placeholder="Buscar exercícios..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {!chipsLoading && chips.length > 1 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={style.chipScrollRow}
              style={style.chipScrollContainer}
            >
              {chips.map((chip) => {
                const isActive = chipSelecionado.id === chip.id;
                return (
                  <AnimatedPressable
                    key={chip.id}
                    style={[style.chip, isActive && style.chipActive]}
                    onPress={() => setChipSelecionado(chip)}
                  >
                    {renderChipIcon(chip, isActive)}
                    <Text
                      style={[style.chipText, isActive && style.chipTextActive]}
                    >
                      {chip.label}
                    </Text>
                  </AnimatedPressable>
                );
              })}
            </ScrollView>
          )}

          {exerciciosSelectLoading ? (
            <LoadingIndicator />
          ) : (
            <FlatList
              data={filteredExercicios}
              keyExtractor={(item) => item.value.toString()}
              renderItem={renderExercicioItem}
              ListEmptyComponent={<EmptyList value="exercício" />}
              ItemSeparatorComponent={SeparatorItem}
              extraData={selectedExercicios}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>

      <ConfirmDialog
        visible={dialog.visible}
        title="Dias já atribuídos"
        message={dialog.message}
        confirmLabel="Substituir"
        onConfirm={() => {
          closeDialog();
          dialog.onConfirm?.();
        }}
        onCancel={closeDialog}
      />

      <ScreenFooter
        onBack={handleGoBack}
        onSave={handleSubmit}
        loading={loading}
      />
    </View>
  );
};

TreinoForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      treinoData: PropTypes.object,
      isEdicao: PropTypes.bool,
    }),
  }),
};

export default TreinoForm;
