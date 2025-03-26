import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';

import PropTypes from 'prop-types';
import BackButton from '../../../components/Button/BackButton';
import SaveButton from '../../../components/Button/SaveButton';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import * as Api from './Api';

const UNIDADE_PESO = ['KG', 'LBS'];

const CargaForm = (props) => {
  const {
    Title,
    Botoes,
    FormContainer,
    FormLabel,
    FormTextInput,
    FormSelectInput,
  } = ComumStyles;
  const { route, navigation } = props;
  const { exercicioId, exercicioNome } = route.params;
  const [formData, setFormData] = useState({
    exercicioId: exercicioId,
    carga: null,
    unidadePeso: UNIDADE_PESO[0],
    qtdRepeticoes: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (!formData.carga || !formData.unidadePeso || !formData.qtdRepeticoes) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    try {
      setLoading(true);
      await Api.saveNewHistoricoCarga(formData);
      Alert.alert('Sucesso', 'Carga salva com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.log('Erro ao salvar novo histórico de carga', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={FormContainer}>
      <Text style={Title}>Adicionar carga para: {exercicioNome}</Text>

      <Text style={FormLabel}>Carga:</Text>
      <TextInput
        style={FormTextInput}
        placeholder="Digite Carga"
        keyboardType="numeric"
        value={formData.carga}
        onChangeText={(cargaValue) => handleChange('carga', cargaValue)}
      />

      <Text style={FormLabel}>Unidade de Peso:</Text>
      <Picker
        style={FormSelectInput}
        selectedValue={UNIDADE_PESO}
        onValueChange={(unidadePesoValue) =>
          handleChange('unidadePeso', unidadePesoValue)
        }
      >
        {UNIDADE_PESO.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>

      <Text style={FormLabel}>Quantidade de Repetições:</Text>
      <TextInput
        style={FormTextInput}
        placeholder="Digite Quantidade de Repetições"
        keyboardType="numeric"
        value={formData.qtdRepeticoes}
        onChangeText={(qtdRepeticoesValue) =>
          handleChange('qtdRepeticoes', qtdRepeticoesValue)
        }
      />

      <View style={Botoes}>
        <BackButton navigation={navigation} />
        <SaveButton onPress={handleSubmit} loading={loading} />
      </View>
    </View>
  );
};

CargaForm.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      exercicioId: PropTypes.number.isRequired,
      exercicioNome: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default CargaForm;
