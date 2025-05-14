import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import BackButton from '../../../../components/Button/BackButton';
import SaveButton from '../../../../components/Button/SaveButton';
import SelectInput from '../../../../components/Inputs/SelectInput';
import TextoInput from '../../../../components/Inputs/TextoInput';
import TimePickerInput from '../../../../components/Inputs/TimePickerInput';
import { ComumStyles } from '../../../../components/Styles/ComumStyles';
import * as EnumApi from '../../../../comum/EnumApi';
import { handleChangeState } from '../../../utils/stateUtils';
import { throwToastError, throwToastSuccess } from '../../../utils/toastUtils';
import * as Api from '../Api';

const RegistroAtividadeForm = (props) => {
  const {
    title,
    botoesContainer,
    formContainer,
    formLabel,
    formLabelObrigatorio,
    asteriscoObrigatorio,
    inputGroup,
    lastInputGroup,
    inlineContainer,
    headerForm,
    subTitleForm,
  } = ComumStyles;
  const { route, navigation } = props;
  const {
    exercicioData,
    registroAtividadeData,
    isExercicioMusculacao,
    isEdicao,
  } = route.params;
  const [formData, setFormData] = useState({
    exercicioId: exercicioData.id,
    peso: registroAtividadeData.peso?.toString() || null,
    unidadePeso: registroAtividadeData.unidadePeso || null,
    qtdRepeticoes: registroAtividadeData.qtdRepeticoes?.toString() || null,
    qtdSeries: registroAtividadeData.qtdSeries?.toString() || null,
    distancia: registroAtividadeData.distancia?.toString() || null,
    duracao: new Date(0, 0, 0, 0, 0, 0),
    observacao: registroAtividadeData.observacao || null,
  });
  const [loading, setLoading] = useState(false);
  const [unidadesPesosItems, setUnidadesPesosItems] = useState([]);
  const [openUnidadesPesosSelect, setOpenUnidadesPesosSelect] = useState(false);
  const [unidadesPesosLoading, setUnidadesPesosLoading] = useState(false);
  const [unidadePesoSelected, setUnidadePesoSelected] = useState(
    registroAtividadeData.unidadePeso || 'KG',
  );

  const convertDecimalHoursToDate = (decimalHours) => {
    const hours = Math.floor(decimalHours);
    const minutes = Math.floor((decimalHours - hours) * 60);
    const seconds = Math.floor(((decimalHours - hours) * 60 - minutes) * 60);
    return new Date(0, 0, 0, hours, minutes, seconds);
  };

  const handleChange = useCallback(
    (field, value) => {
      handleChangeState(setFormData, formData, field, value);
    },
    [formData],
  );

  const convertDurationToDecimalHours = (date) => {
    const decimalHours =
      date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
    return parseFloat(decimalHours.toFixed(2));
  };

  const handleSubmit = async () => {
    if (
      isExercicioMusculacao &&
      (!formData.peso || !formData.unidadePeso || !formData.qtdRepeticoes)
    ) {
      throwToastError('Todos os campos são obrigatórios!');
      return;
    }

    if (!isExercicioMusculacao && (!formData.distancia || !formData.duracao)) {
      throwToastError('Todos os campos são obrigatórios!');
      return;
    }

    try {
      setLoading(true);
      const values = {
        ...formData,
        duracao: !isExercicioMusculacao
          ? convertDurationToDecimalHours(formData.duracao)
          : null,
      };

      if (isEdicao) {
        await Api.editRegistroAtividade(registroAtividadeData.id, values);
      } else {
        await Api.saveRegistroAtividade(values);
      }

      throwToastSuccess('Registro salvo com sucesso!');
      navigation.goBack();
    } catch (error) {
      throwToastError(
        `Erro ao salvar novo registro de ${isExercicioMusculacao ? 'carga' : 'cardio'}`,
      );
      console.log(
        `Erro ao salvar novo registro de ${isExercicioMusculacao ? 'carga' : 'cardio'}`,
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchUnidadesPesos = async () => {
    try {
      setUnidadesPesosLoading(true);
      const { data } = await EnumApi.fetchUnidadesPesosSelect();
      setUnidadesPesosItems(data);
    } catch (error) {
      console.error('Erro ao carregar select de unidades de pesos.', error);
    } finally {
      setUnidadesPesosLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUnidadesPesos();
      if (isEdicao) {
        setFormData((prev) => ({
          ...prev,
          duracao: convertDecimalHoursToDate(registroAtividadeData.duracao),
        }));
      }
    }, [isEdicao, registroAtividadeData.duracao]),
  );

  const renderFieldsRegistroCarga = () => {
    return (
      <View>
        <View style={inlineContainer}>
          <View style={inputGroup}>
            <View style={formLabelObrigatorio}>
              <Text style={formLabel}>Peso</Text>
              <Text style={asteriscoObrigatorio}>*</Text>
            </View>
            <TextoInput
              placeholder="Ex: 12.5"
              keyboardType="numeric"
              value={formData.peso}
              onChangeText={(pesoValue) => handleChange('peso', pesoValue)}
            />
          </View>

          <View style={lastInputGroup}>
            <View style={formLabelObrigatorio}>
              <Text style={formLabel}>Unidade</Text>
              <Text style={asteriscoObrigatorio}>*</Text>
            </View>
            <SelectInput
              open={openUnidadesPesosSelect}
              setOpen={setOpenUnidadesPesosSelect}
              items={unidadesPesosItems}
              setItems={setUnidadesPesosItems}
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

        <View style={inlineContainer}>
          <View style={inputGroup}>
            <View style={formLabelObrigatorio}>
              <Text style={formLabel}>Qtd de Reps:</Text>
              <Text style={asteriscoObrigatorio}>*</Text>
            </View>
            <TextoInput
              placeholder="Ex: 12"
              keyboardType="numeric"
              value={formData.qtdRepeticoes}
              onChangeText={(qtdRepeticoesValue) =>
                handleChange('qtdRepeticoes', qtdRepeticoesValue)
              }
            />
          </View>

          <View style={lastInputGroup}>
            <View style={formLabelObrigatorio}>
              <Text style={formLabel}>Qtd de Séries</Text>
              <Text style={asteriscoObrigatorio}>*</Text>
            </View>
            <TextoInput
              placeholder="Ex: 4"
              keyboardType="numeric"
              value={formData.qtdSeries}
              onChangeText={(qtdSeriesValue) =>
                handleChange('qtdSeries', qtdSeriesValue)
              }
            />
          </View>
        </View>
      </View>
    );
  };

  const renderFieldsRegistroCardio = () => {
    return (
      <View>
        <View style={formLabelObrigatorio}>
          <Text style={formLabel}>Distância:</Text>
          <Text style={asteriscoObrigatorio}>*</Text>
        </View>
        <TextoInput
          placeholder="Digite a distância em km"
          keyboardType="numeric"
          value={formData.distancia}
          onChangeText={(distanciaValue) =>
            handleChange('distancia', distanciaValue)
          }
        />

        <View style={formLabelObrigatorio}>
          <Text style={formLabel}>Duração:</Text>
          <Text style={asteriscoObrigatorio}>*</Text>
        </View>
        <TimePickerInput
          time={formData.duracao}
          setTime={(newTime) => handleChange('duracao', newTime)}
        />
      </View>
    );
  };

  return (
    <View style={formContainer}>
      <View style={headerForm}>
        <Text style={title}>Adicionar Registro para: {exercicioData.nome}</Text>
        <Text style={subTitleForm}>
          Campos marcados com <Text style={asteriscoObrigatorio}>*</Text> são
          obrigatórios
        </Text>
      </View>

      {isExercicioMusculacao
        ? renderFieldsRegistroCarga()
        : renderFieldsRegistroCardio()}

      <Text style={formLabel}>Observação:</Text>
      <TextoInput
        placeholder="Informe uma observação"
        value={formData.observacao}
        onChangeText={(observacaoValue) =>
          handleChange('observacao', observacaoValue)
        }
      />

      <View style={botoesContainer}>
        <BackButton onPress={navigation.goBack} />
        <SaveButton onPress={handleSubmit} loading={loading} />
      </View>
    </View>
  );
};

RegistroAtividadeForm.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      exercicioData: PropTypes.object.isRequired,
      isExercicioMusculacao: PropTypes.bool.isRequired,
      registroAtividadeData: PropTypes.object,
      isEdicao: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default RegistroAtividadeForm;
