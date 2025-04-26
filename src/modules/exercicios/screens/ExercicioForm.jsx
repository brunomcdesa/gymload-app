import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import BackButton from '../../../components/Button/BackButton';
import SaveButton from '../../../components/Button/SaveButton';
import { ComumStyles } from '../../../components/Styles/ComumStyles';

import PropTypes from 'prop-types';
import SelectInput from '../../../components/Inputs/SelectInput';
import * as EnumApi from '../../../comum/EnumApi';
import * as GrupoMuscularApi from '../../gruposMusculares/Api';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';

const ExercicioForm = (props) => {
  const { title, botoesContainer, formContainer, formLabel, formTextInput } =
    ComumStyles;
  const { navigation } = props;
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    grupoMuscularId: null,
    tipoExercicio: '',
    tipoPegada: '',
  });
  const [loading, setLoading] = useState(false);
  const [gruposMuscularesItems, setGruposMuscularesItems] = useState([]);
  const [openGrupoMuscularSelect, setOpenGrupoMuscularSelect] = useState(false);
  const [gruposMuscularesLoading, setGruposMuscularesLoading] = useState(false);
  const [grupoMuscularIdSelected, setGrupoMuscularIdSelected] = useState(null);
  const [tiposExercicioItems, setTiposExercicioItems] = useState([]);
  const [openTipoExercicioSelect, setOpenTipoExercicioSelect] = useState(false);
  const [tipoExercicioLoading, setTipoExercicioLoading] = useState(false);
  const [tipoExercicioSelected, setTipoExercicioSelected] = useState(null);
  const [tiposPegadaItems, setTiposPegadaItems] = useState([]);
  const [openTipoPegadaSelect, setOpenTipoPegadaSelect] = useState(false);
  const [tipoPegadaLoading, setTipoPegadaLoading] = useState(false);
  const [tipoPegadaSelected, setTipoPegadaSelected] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
      setGruposMuscularesLoading(true);
      const { data } = await GrupoMuscularApi.fetchGruposMuscularesSelect();
      setGruposMuscularesItems(data);
    } catch (error) {
      console.log('Erro ao buscar select de grupos musculares.', error);
    } finally {
      setGruposMuscularesLoading(false);
    }
  };

  const fetchTiposExerciciosSelect = async () => {
    try {
      setTipoExercicioLoading(true);
      const { data } = await EnumApi.fetchTiposExerciciosSelect();
      setTiposExercicioItems(data);
    } catch (error) {
      console.log('Erro ao buscar select de tipos de exercícios.', error);
    } finally {
      setTipoExercicioLoading(false);
    }
  };

  const fetchTiposPegadasSelect = async () => {
    try {
      setTipoPegadaLoading(true);
      const { data } = await EnumApi.fetchTiposPegadasSelect();
      setTiposPegadaItems(data);
    } catch (error) {
      console.log('Erro ao buscar select de tipos pegadas.', error);
    } finally {
      setTipoPegadaLoading(false);
    }
  };

  useEffect(() => {
    fetchGruposMuscularesSelect();
    fetchTiposExerciciosSelect();
    fetchTiposPegadasSelect();
  }, []);

  return (
    <View style={formContainer}>
      <Text style={title}>Adicionar Exercício</Text>

      <Text style={formLabel}>Nome:</Text>
      <TextInput
        style={formTextInput}
        placeholder="Digite o nome"
        value={formData.nome}
        onChangeText={(nomeValue) => handleChange('nome', nomeValue)}
      />

      <Text style={formLabel}>Descricao:</Text>
      <TextInput
        style={formTextInput}
        placeholder="Digite a descricao"
        value={formData.descricao}
        onChangeText={(descricaoValue) =>
          handleChange('descricao', descricaoValue)
        }
      />

      <Text style={formLabel}>Grupo Muscular:</Text>
      <SelectInput
        open={openGrupoMuscularSelect}
        setOpen={setOpenGrupoMuscularSelect}
        items={gruposMuscularesItems}
        setItems={setGruposMuscularesItems}
        value={grupoMuscularIdSelected || ''}
        setValue={setGrupoMuscularIdSelected}
        loading={gruposMuscularesLoading}
        multiple={false}
        placeholder="Selecione o grupo muscular"
        handleChange={handleChange}
        field="grupoMuscularId"
        zIndex={3000}
        zIndexInverse={1000}
      />

      <Text style={formLabel}>Tipo de Exercício:</Text>
      <SelectInput
        open={openTipoExercicioSelect}
        setOpen={setOpenTipoExercicioSelect}
        items={tiposExercicioItems}
        setItems={setTiposExercicioItems}
        value={tipoExercicioSelected || ''}
        setValue={setTipoExercicioSelected}
        loading={tipoExercicioLoading}
        placeholder="Selecione o tipo de exercício"
        handleChange={handleChange}
        field="tipoExercicio"
        zIndex={2000}
        zIndexInverse={200}
      />

      <Text style={formLabel}>Tipo de Pegada:</Text>
      <SelectInput
        open={openTipoPegadaSelect}
        setOpen={setOpenTipoPegadaSelect}
        items={tiposPegadaItems}
        setItems={setTiposPegadaItems}
        value={tipoPegadaSelected || ''}
        setValue={setTipoPegadaSelected}
        loading={tipoPegadaLoading}
        placeholder="Selecione o tipo de pegada"
        handleChange={handleChange}
        field="tipoPegada"
        zIndex={1000}
        zIndexInverse={100}
      />

      <View style={botoesContainer}>
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
