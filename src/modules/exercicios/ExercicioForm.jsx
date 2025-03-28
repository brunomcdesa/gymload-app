import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import BackButton from '../../components/Button/BackButton';
import SaveButton from '../../components/Button/SaveButton';
import { ComumStyles } from '../../components/Styles/ComumStyles';

import PropTypes from 'prop-types';
import * as GrupoMuscularApi from '../gruposMusculares/Api';
import { handleChangeState } from '../utils/stateUtils';
import { throwToastError, throwToastSuccess } from '../utils/toastUtils';
import * as Api from './Api';

const TIPO_EXERCICIO = [
  'HALTER',
  'BARRA',
  'MAQUINA',
  'POLIA',
  'ANILHA',
  'BOLA',
  'KETTLEBEL',
  'BAG',
  'CORPORAL',
];

const TIPO_PEGADA = ['PRONADA', 'SUPINADA', 'NEUTRA', 'CORDA'];

const ExercicioForm = (props) => {
  const {
    Title,
    Botoes,
    FormContainer,
    FormLabel,
    FormTextInput,
    FormSelectInput,
  } = ComumStyles;
  const { navigation } = props;
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    grupoMuscularId: null,
    tipoExercicio: TIPO_EXERCICIO[0],
    tipoPegada: TIPO_PEGADA[0],
  });
  const [gruposMuscularesSelect, setGruposMuscularesSelect] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    handleChangeState(setFormData, formData, field, value);
  };

  const handleSubmit = async () => {
    if (
      !formData.nome ||
      !formData.descricao ||
      !formData.grupoMuscularId ||
      !formData.tipoExercicio ||
      !formData.tipoPegada
    ) {
      throwToastError('Todos os campos são obrigatórios!');
      return;
    }

    try {
      setLoading(true);
      await Api.saveExercicio(formData);

      throwToastSuccess('Exercicio salvo com sucesso!');
      navigation.goBack();
    } catch (error) {
      throwToastError('Erro ao salvar novo Exercício.');
      console.log('Erro ao salvar novo Exercício.', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGruposMuscularesSelect = async () => {
    try {
      const { data } = await GrupoMuscularApi.fetchGruposMuscularesSelect();
      setGruposMuscularesSelect(data);
    } catch (error) {
      console.log('Erro ao buscar select de grupos musculares.', error);
    }
  };

  useEffect(() => {
    fetchGruposMuscularesSelect();
  }, []);

  return (
    <View style={FormContainer}>
      <Text style={Title}>Adicionar Exercício</Text>

      <Text style={FormLabel}>Nome:</Text>
      <TextInput
        style={FormTextInput}
        placeholder="Digite o nome"
        value={formData.nome}
        onChangeText={(nomeValue) => handleChange('nome', nomeValue)}
      />

      <Text style={FormLabel}>Descricao:</Text>
      <TextInput
        style={FormTextInput}
        placeholder="Digite a descricao"
        value={formData.descricao}
        onChangeText={(descricaoValue) =>
          handleChange('descricao', descricaoValue)
        }
      />

      <Text style={FormLabel}>Grupo Muscular:</Text>
      <Picker
        style={FormSelectInput}
        selectedValue={gruposMuscularesSelect}
        onValueChange={(grupoMuscularValue) =>
          handleChange('grupoMuscularId', grupoMuscularValue)
        }
      >
        {gruposMuscularesSelect.map((grupoMuscular, index) => (
          <Picker.Item
            key={index}
            label={grupoMuscular.value}
            value={grupoMuscular.id}
          />
        ))}
      </Picker>

      <Text style={FormLabel}>Tipo de Exercício:</Text>
      <Picker
        style={FormSelectInput}
        selectedValue={TIPO_EXERCICIO}
        onValueChange={(tipoExercicioValue) =>
          handleChange('tipoExercicio', tipoExercicioValue)
        }
      >
        {TIPO_EXERCICIO.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>

      <Text style={FormLabel}>Tipo de Pegada:</Text>
      <Picker
        style={FormSelectInput}
        selectedValue={TIPO_PEGADA}
        onValueChange={(tipoPegadaValue) =>
          handleChange('tipoPegada', tipoPegadaValue)
        }
      >
        {TIPO_PEGADA.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>

      <View style={Botoes}>
        <BackButton navigation={navigation} />
        <SaveButton onPress={handleSubmit} loading={loading} />
      </View>
    </View>
  );
};

ExercicioForm.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExercicioForm;
