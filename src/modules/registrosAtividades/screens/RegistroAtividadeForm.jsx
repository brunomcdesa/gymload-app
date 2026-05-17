import React, { useCallback, useLayoutEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import FormFooter from '../../../components/Button/FormFooter';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import SelectInput from '../../../components/Inputs/SelectInput';
import TextoInput from '../../../components/Inputs/TextoInput';
import TimePickerInput from '../../../components/Inputs/TimePickerInput';
import { ComumStyles, colors } from '../../../components/Styles/ComumStyles';
import * as EnumApi from '../../../comum/EnumApi';
import { handleChangeState } from '../../utils/stateUtils';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';

const stepperStyle = StyleSheet.create({
  stepperSection: {
    marginBottom: 16,
  },
  stepperLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.terciary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  stepperRequired: {
    color: colors.secondary,
    marginLeft: 2,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    padding: 12,
  },
  stepperMinus: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperPlus: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonText: {
    color: colors.textLight,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 26,
  },
  stepperValueContainer: {
    flex: 1,
    alignItems: 'center',
  },
  stepperValue: {
    fontSize: 42,
    fontWeight: '800',
    color: colors.secondary,
    letterSpacing: -1,
    lineHeight: 48,
  },
  stepperUnit: {
    fontSize: 14,
    color: colors.terciary,
    fontWeight: '600',
    marginTop: 2,
  },
  smallStepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    padding: 10,
  },
  smallStepperMinus: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallStepperPlus: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallStepperButtonText: {
    color: colors.textLight,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
  },
  smallStepperValue: {
    flex: 1,
    fontSize: 28,
    fontWeight: '800',
    color: colors.textLight,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  smallStepperPair: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  smallStepperItem: {
    flex: 1,
  },
});

const StepperLarge = ({
  label,
  value,
  unit,
  onDecrement,
  onIncrement,
  required,
}) => (
  <View style={stepperStyle.stepperSection}>
    <Text style={stepperStyle.stepperLabel}>
      {label}
      {required && <Text style={stepperStyle.stepperRequired}> *</Text>}
    </Text>
    <View style={stepperStyle.stepperRow}>
      <TouchableOpacity
        style={stepperStyle.stepperMinus}
        onPress={onDecrement}
        activeOpacity={0.7}
      >
        <Text style={stepperStyle.stepperButtonText}>−</Text>
      </TouchableOpacity>
      <View style={stepperStyle.stepperValueContainer}>
        <Text style={stepperStyle.stepperValue}>{value || '0'}</Text>
        {unit ? <Text style={stepperStyle.stepperUnit}>{unit}</Text> : null}
      </View>
      <TouchableOpacity
        style={stepperStyle.stepperPlus}
        onPress={onIncrement}
        activeOpacity={0.7}
      >
        <Text style={stepperStyle.stepperButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

StepperLarge.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  unit: PropTypes.string,
  onDecrement: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

const StepperSmall = ({ label, value, onDecrement, onIncrement, required }) => (
  <View style={stepperStyle.smallStepperItem}>
    <Text style={stepperStyle.stepperLabel}>
      {label}
      {required && <Text style={stepperStyle.stepperRequired}> *</Text>}
    </Text>
    <View style={stepperStyle.smallStepperRow}>
      <TouchableOpacity
        style={stepperStyle.smallStepperMinus}
        onPress={onDecrement}
        activeOpacity={0.7}
      >
        <Text style={stepperStyle.smallStepperButtonText}>−</Text>
      </TouchableOpacity>
      <Text style={stepperStyle.smallStepperValue}>{value || '0'}</Text>
      <TouchableOpacity
        style={stepperStyle.smallStepperPlus}
        onPress={onIncrement}
        activeOpacity={0.7}
      >
        <Text style={stepperStyle.smallStepperButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

StepperSmall.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onDecrement: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

const RegistroAtividadeForm = (props) => {
  const {
    formContainer,
    formLabel,
    formLabelObrigatorio,
    asteriscoObrigatorio,
    inputGroup,
    lastInputGroup,
    inlineContainer,
    scrollContentContainer,
  } = ComumStyles;
  const { route, navigation } = props;
  const { exercicioData, registroAtividadeData, isEdicao, variacaoData } =
    route.params;
  const {
    id,
    nome,
    possuiVariacao,
    isExercicioMusculacao,
    isExercicioAerobico,
    isExercicioCalistenia,
  } = exercicioData;
  const [formData, setFormData] = useState({
    exercicioId: id,
    variacaoId: variacaoData?.id ?? null,
    peso: registroAtividadeData.peso?.toString() || '0',
    unidadePeso: registroAtividadeData.unidadePeso || null,
    qtdRepeticoes: registroAtividadeData.qtdRepeticoes?.toString() || '1',
    qtdSeries: registroAtividadeData.qtdSeries?.toString() || '1',
    distancia: registroAtividadeData.distancia?.toString() || null,
    duracao: new Date(0, 0, 0, 0, 0, 0),
    observacao: registroAtividadeData.observacao || null,
    tipoPegada: null,
  });
  const [loading, setLoading] = useState(false);
  const [unidadesPesosItens, setUnidadesPesosItens] = useState([]);
  const [tiposPegadasItens, setTiposPegadasItens] = useState([]);
  const [openUnidadesPesosSelect, setOpenUnidadesPesosSelect] = useState(false);
  const [openTiposPegadasSelect, setOpenTiposPegadasSelect] = useState(false);
  const [unidadesPesosLoading, setUnidadesPesosLoading] = useState(false);
  const [tiposPegadasLoading, setTiposPegadasLoading] = useState(false);
  const [unidadePesoSelected, setUnidadePesoSelected] = useState(
    registroAtividadeData.unidadePeso,
  );
  const [tipoPegadaSelected, setTipoPegadaSelected] = useState(null);

  const convertDecimalHoursToDate = (decimalHours) => {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    return new Date(0, 0, 0, hours, minutes, 0);
  };

  const handleChange = useCallback(
    (field, value) => {
      handleChangeState(setFormData, formData, field, value);
    },
    [formData],
  );

  const convertDurationToDecimalHours = (date) => {
    const decimalHours = date.getHours() + date.getMinutes() / 60;
    return parseFloat(decimalHours.toFixed(6));
  };

  const pesoStep = unidadePesoSelected === 'LB' ? 1 : 2.5;

  const adjustPeso = (delta) => {
    const current = parseFloat(formData.peso) || 0;
    const next = Math.max(0, current + delta);
    const formatted = Number.isInteger(next) ? String(next) : next.toFixed(1);
    handleChange('peso', formatted);
  };

  const adjustInt = (field, delta, min = 1) => {
    const current = parseInt(formData[field], 10) || min;
    const next = Math.max(min, current + delta);
    handleChange(field, String(next));
  };

  const handleSubmit = async () => {
    if (possuiVariacao && !variacaoData?.id) {
      throwToastError('Selecione uma variação antes de salvar.');
      return;
    }

    if (
      (isExercicioMusculacao &&
        (!formData.peso || !formData.unidadePeso || !formData.qtdRepeticoes)) ||
      (isExercicioAerobico && (!formData.distancia || !formData.duracao)) ||
      (isExercicioCalistenia &&
        (!formData.qtdSeries || !formData.qtdRepeticoes))
    ) {
      throwToastError('Todos os campos são obrigatórios!');
      return;
    }

    try {
      setLoading(true);
      const values = {
        ...formData,
        duracao: isExercicioAerobico
          ? convertDurationToDecimalHours(formData.duracao)
          : null,
        distancia: isExercicioAerobico ? parseFloat(formData.distancia) : null,
        ...(isExercicioAerobico && {
          peso: null,
          unidadePeso: null,
          qtdRepeticoes: null,
          qtdSeries: null,
          tipoPegada: null,
        }),
      };

      if (isEdicao) {
        await Api.editRegistroAtividade(registroAtividadeData.id, values);
      } else {
        await Api.saveRegistroAtividade(values);
      }

      throwToastSuccess('Registro salvo com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.log(error?.data[0]?.message);
      const errorMessage =
        error.data[0]?.message || 'Erro ao salvar novo registro';
      throwToastError(errorMessage);
      console.log('Erro ao salvar novo registro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnidadesPesos = async () => {
    try {
      setUnidadesPesosLoading(true);
      const { data } = await EnumApi.fetchUnidadesPesosSelect();
      setUnidadesPesosItens(data);
    } catch (error) {
      console.error('Erro ao carregar select de unidades de pesos.', error);
    } finally {
      setUnidadesPesosLoading(false);
    }
  };

  const fetchTiposPegadas = async () => {
    try {
      setTiposPegadasLoading(true);
      const { data } = await EnumApi.fetchTiposPegadasSelect();
      setTiposPegadasItens(data);
    } catch (error) {
      console.error('Erro ao carregar select de tipos de pegadas.', error);
    } finally {
      setTiposPegadasLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUnidadesPesos();
      fetchTiposPegadas();
      if (isEdicao) {
        setFormData((prev) => ({
          ...prev,
          duracao: convertDecimalHoursToDate(registroAtividadeData.duracao),
        }));
      }
    }, [isEdicao, registroAtividadeData.duracao]),
  );

  const renderHeaderTitle = useCallback(() => {
    return (
      <HeaderTitle
        title={nome}
        subtitle={variacaoData?.nome}
        isForm={!variacaoData?.nome}
      />
    );
  }, [nome, variacaoData]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
      headerTitleAlign: 'center',
      headerLeft: () => null,
      headerBackVisible: false,
      gestureEnabled: false,
    });
  }, [navigation, renderHeaderTitle]);

  const renderFieldsRegistroMusculacao = () => {
    return (
      <View>
        {/* Peso stepper */}
        <StepperLarge
          label="Carga"
          value={formData.peso}
          unit={unidadePesoSelected || 'KG'}
          onDecrement={() => adjustPeso(-pesoStep)}
          onIncrement={() => adjustPeso(pesoStep)}
          required
        />

        {/* Unidade select */}
        <View style={inlineContainer}>
          <View style={lastInputGroup}>
            <View style={formLabelObrigatorio}>
              <Text style={formLabel}>Unidade</Text>
              <Text style={asteriscoObrigatorio}>*</Text>
            </View>
            <SelectInput
              open={openUnidadesPesosSelect}
              setOpen={setOpenUnidadesPesosSelect}
              items={unidadesPesosItens}
              setItems={setUnidadesPesosItens}
              value={unidadePesoSelected || 'KG'}
              setValue={setUnidadePesoSelected}
              loading={unidadesPesosLoading}
              multiple={false}
              handleChange={handleChange}
              field="unidadePeso"
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>
        </View>

        {/* Séries + Repetições steppers side by side */}
        <View style={stepperStyle.smallStepperPair}>
          <StepperSmall
            label="Séries"
            value={formData.qtdSeries}
            onDecrement={() => adjustInt('qtdSeries', -1)}
            onIncrement={() => adjustInt('qtdSeries', 1)}
            required
          />
          <StepperSmall
            label="Repetições"
            value={formData.qtdRepeticoes}
            onDecrement={() => adjustInt('qtdRepeticoes', -1)}
            onIncrement={() => adjustInt('qtdRepeticoes', 1)}
            required
          />
        </View>

        <Text style={formLabel}>Tipo de pegada</Text>
        <SelectInput
          open={openTiposPegadasSelect}
          setOpen={setOpenTiposPegadasSelect}
          items={tiposPegadasItens}
          setItems={setTiposPegadasItens}
          value={tipoPegadaSelected}
          setValue={setTipoPegadaSelected}
          loading={tiposPegadasLoading}
          multiple={false}
          handleChange={handleChange}
          field="tipoPegada"
          zIndex={3000}
          zIndexInverse={1000}
        />
      </View>
    );
  };

  const renderFieldsRegistroAerobico = () => {
    return (
      <View>
        <View style={stepperStyle.stepperSection}>
          <Text style={stepperStyle.stepperLabel}>
            DISTÂNCIA
            <Text style={stepperStyle.stepperRequired}> *</Text>
          </Text>
          <TextoInput
            placeholder="Digite a distância em km"
            keyboardType="numeric"
            value={formData.distancia}
            onChangeText={(distanciaValue) =>
              handleChange('distancia', distanciaValue)
            }
          />
        </View>

        <View style={stepperStyle.stepperSection}>
          <Text style={stepperStyle.stepperLabel}>
            DURAÇÃO
            <Text style={stepperStyle.stepperRequired}> *</Text>
          </Text>
          <TimePickerInput
            time={formData.duracao}
            setTime={(newTime) => handleChange('duracao', newTime)}
          />
        </View>
      </View>
    );
  };

  const renderFieldsRegistroCalistenia = () => {
    return (
      <View>
        {/* Séries + Repetições steppers */}
        <View style={stepperStyle.smallStepperPair}>
          <StepperSmall
            label="Séries"
            value={formData.qtdSeries}
            onDecrement={() => adjustInt('qtdSeries', -1)}
            onIncrement={() => adjustInt('qtdSeries', 1)}
            required
          />
          <StepperSmall
            label="Repetições"
            value={formData.qtdRepeticoes}
            onDecrement={() => adjustInt('qtdRepeticoes', -1)}
            onIncrement={() => adjustInt('qtdRepeticoes', 1)}
            required
          />
        </View>

        {/* Optional weight */}
        <View style={inlineContainer}>
          <View style={inputGroup}>
            <Text style={formLabel}>Peso Adicional</Text>
            <TextoInput
              placeholder="Ex: 12.5"
              keyboardType="numeric"
              value={formData.peso}
              onChangeText={(pesoValue) => handleChange('peso', pesoValue)}
            />
          </View>

          <View style={lastInputGroup}>
            <Text style={formLabel}>Unidade</Text>
            <SelectInput
              open={openUnidadesPesosSelect}
              setOpen={setOpenUnidadesPesosSelect}
              items={unidadesPesosItens}
              setItems={setUnidadesPesosItens}
              value={unidadePesoSelected}
              setValue={setUnidadePesoSelected}
              loading={unidadesPesosLoading}
              multiple={false}
              handleChange={handleChange}
              field="unidadePeso"
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={formContainer}>
      <ScrollView contentContainerStyle={scrollContentContainer}>
        {isExercicioMusculacao && renderFieldsRegistroMusculacao()}
        {isExercicioAerobico && renderFieldsRegistroAerobico()}
        {isExercicioCalistenia && renderFieldsRegistroCalistenia()}

        <Text style={formLabel}>Observação:</Text>
        <TextoInput
          placeholder="Informe uma observação"
          value={formData.observacao}
          onChangeText={(observacaoValue) =>
            handleChange('observacao', observacaoValue)
          }
        />
      </ScrollView>

      <FormFooter
        onBack={() => navigation.goBack()}
        onSave={handleSubmit}
        loading={loading}
      />
    </View>
  );
};

RegistroAtividadeForm.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      exercicioData: PropTypes.object.isRequired,
      registroAtividadeData: PropTypes.object,
      isEdicao: PropTypes.bool.isRequired,
      variacaoData: PropTypes.shape({
        id: PropTypes.number,
        nome: PropTypes.string,
      }),
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

export default RegistroAtividadeForm;
