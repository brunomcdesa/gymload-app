import React, { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import BackButton from '../../components/Button/BackButton';
import SaveButton from '../../components/Button/SaveButton';
import ComumStyles from '../../components/Styles/ComumStyles';
import * as Api from './Api';

const GrupoMuscularForm = ({ navigation }) => {
  const { Title, Botoes, FormContainer, FormLabel, FormTextInput } =
    ComumStyles;
  const [formData, setFormData] = useState({
    nome: null,
    codigo: null,
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

      <Text style={FormLabel}>Codigo:</Text>
      <TextInput
        style={FormTextInput}
        placeholder="Digite o codigo"
        value={formData.codigo}
        onChangeText={(codigoValue) => handleChange('codigo', codigoValue)}
      />

      <View style={Botoes}>
        <BackButton navigation={navigation} />
        <SaveButton onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default GrupoMuscularForm;
