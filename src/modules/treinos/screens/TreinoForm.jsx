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
import FormFooter from '../../../components/Button/FormFooter';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import TextoInput from '../../../components/Inputs/TextoInput';
import EmptyList from '../../../components/List/EmptyList';
import SeparatorItem from '../../../components/List/SeparatorItem';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { ComumStyles, colors } from '../../../components/Styles/ComumStyles';
import { AuthContext } from '../../../context/AuthProvider';
import * as ExercicioApi from '../../exercicios/Api';
import * as GrupoMuscularApi from '../../gruposMusculares/Api';
import {
  renderIconeGrupoMuscular,
  renderIconeTipoExercicio,
} from '../../utils/iconesUtils';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from '../style/style';

const CHIP_TODOS = { id: 'todos', label: 'Todos', tipo: 'todos', value: null };

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
    } catch (error) {
      throwToastError('Erro ao buscar exercícios do treino.');
      console.error(`Erro ao buscar exercícios do treino ${id}`, error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleSave = async () => {
    try {
      setLoading(true);
      await Api.saveTreinos(formData);
      throwToastSuccess('Treino salvo com sucesso!');
      handleGoBack();
    } catch (error) {
      throwToastError('Erro ao salvar treino.');
      console.log('Erro ao salvar treino.', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = async () => {
    try {
      setLoading(true);
      await Api.editarTreinos({ id: treinoData.id, request: formData });
      throwToastSuccess('Treino salvo com sucesso!');
      handleGoBack();
    } catch (error) {
      throwToastError('Erro ao salvar treino.');
      console.log('Erro ao salvar treino.', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchChips();
      fetchExerciciosSelect();
      if (isEdicao) {
        fetchExerciciosDoTreino();
      }
    }, [fetchChips, fetchExerciciosSelect, fetchExerciciosDoTreino, isEdicao]),
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

      <FormFooter
        onBack={handleGoBack}
        onSave={isEdicao ? handleEditar : handleSave}
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
