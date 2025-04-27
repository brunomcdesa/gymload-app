import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import PropTypes from 'prop-types';
import BackButton from '../../../../components/Button/BackButton';
import SaveButton from '../../../../components/Button/SaveButton';
import SelectInput from '../../../../components/Inputs/SelectInput';
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
    formTextInput,
    formLabelObrigatorio,
    asteriscoObrigatorio,
  } = ComumStyles;
  const { route, navigation } = props;
  const { exercicioId, exercicioNome, isExercicioMusculacao } = route.params;
  const [formData, setFormData] = useState({
    exercicioId: exercicioId,
    peso: null,
    unidadePeso: null,
    qtdRepeticoes: null,
    qtdSeries: null,
    distancia: null,
    duracao: new Date(0, 0, 0, 0, 0, 0),
    observacao: null,
  });
  const [loading, setLoading] = useState(false);
  const [unidadesPesosItems, setUnidadesPesosItems] = useState([]);
  const [openUnidadesPesosSelect, setOpenUnidadesPesosSelect] = useState(false);
  const [unidadesPesosLoading, setUnidadesPesosLoading] = useState(false);
  const [unidadePesoSelected, setUnidadePesoSelected] = useState(null);

  const handleChange = (field, value) => {
    handleChangeState(setFormData, formData, field, value);
  };

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
      await Api.saveRegistroAtividade(values);

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

  useEffect(() => {
    fetchUnidadesPesos();
  }, []);

  const renderFieldsRegistroCarga = () => {
    return (
      <View>
        <View style={formLabelObrigatorio}>
          <Text style={formLabel}>Peso:</Text>
          <Text style={asteriscoObrigatorio}>*</Text>
        </View>
        <TextInput
          style={formTextInput}
          placeholder="Digite o Peso"
          keyboardType="numeric"
          value={formData.peso}
          onChangeText={(pesoValue) => handleChange('peso', pesoValue)}
        />

        <View style={formLabelObrigatorio}>
          <Text style={formLabel}>Unidade Peso:</Text>
          <Text style={asteriscoObrigatorio}>*</Text>
        </View>
        <SelectInput
          open={openUnidadesPesosSelect}
          setOpen={setOpenUnidadesPesosSelect}
          items={unidadesPesosItems}
          setItems={setUnidadesPesosItems}
          value={unidadePesoSelected || ''}
          setValue={setUnidadePesoSelected}
          loading={unidadesPesosLoading}
          multiple={false}
          placeholder="Selecione a unidade de peso"
          handleChange={handleChange}
          field="unidadePeso"
          zIndex={3000}
          zIndexInverse={1000}
        />

        <View style={formLabelObrigatorio}>
          <Text style={formLabel}>Quantidade de Reperições:</Text>
          <Text style={asteriscoObrigatorio}>*</Text>
        </View>
        <TextInput
          style={formTextInput}
          placeholder="Digite Quantidade de Repetições"
          keyboardType="numeric"
          value={formData.qtdRepeticoes}
          onChangeText={(qtdRepeticoesValue) =>
            handleChange('qtdRepeticoes', qtdRepeticoesValue)
          }
        />

        <View style={formLabelObrigatorio}>
          <Text style={formLabel}>Quantidade de séries:</Text>
          <Text style={asteriscoObrigatorio}>*</Text>
        </View>
        <TextInput
          style={formTextInput}
          placeholder="Digite Quantidade de Séries"
          keyboardType="numeric"
          value={formData.qtdSeries}
          onChangeText={(qtdSeriesValue) =>
            handleChange('qtdSeries', qtdSeriesValue)
          }
        />
      </View>
    );
  };

  const renderFieldsRegistroCardio = () => {
    return (
      <View>
        <View style={formLabelObrigatorio}>
          <Text style={formLabel}>Carga:</Text>
          <Text style={asteriscoObrigatorio}>*</Text>
        </View>
        <TextInput
          style={formTextInput}
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
      <View style={{ alignItems: 'center' }}>
        <Text style={title}>Adicionar Registro para: {exercicioNome}</Text>
        <Text style={{ color: '#aaa', marginBottom: 10 }}>
          Campos marcados com <Text style={{ color: '#ff5555' }}>*</Text> são
          obrigatórios
        </Text>
      </View>

      {isExercicioMusculacao
        ? renderFieldsRegistroCarga()
        : renderFieldsRegistroCardio()}
      <Text style={formLabel}>Observação:</Text>

      <TextInput
        style={formTextInput}
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
      exercicioId: PropTypes.number.isRequired,
      exercicioNome: PropTypes.string.isRequired,
      isExercicioMusculacao: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default RegistroAtividadeForm;
