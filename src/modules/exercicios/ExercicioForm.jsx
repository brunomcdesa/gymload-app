import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import BackButton from '../../components/Button/BackButton';
import SaveButton from '../../components/Button/SaveButton';
import ComumStyles from '../../comum/ComumStyles';

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

const ExercicioForm = ({ navigation }) => {
  const {
    Title,
    Botoes,
    FormContainer,
    FormLabel,
    FormTextInput,
    FormSelectInput,
  } = ComumStyles;
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    grupoMuscularId: null,
    tipoExercicio: TIPO_EXERCICIO[0],
    tipoPegada: TIPO_PEGADA[0],
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (!formData.nome || !formData.codigo) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    try {
      await Api.saveGrupoMuscular(formData);
      Alert.alert('Sucesso', 'Grupo Muscular salvo com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.log('Erro ao salvar novo histórico de carga', error);
    }
  };

  return (
    <View style={FormContainer}>
      <Text style={Title}>Adicionar Grupo Muscular</Text>

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

      <View style={Botoes}>
        <BackButton navigation={navigation} />
        <SaveButton onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default ExercicioForm;
