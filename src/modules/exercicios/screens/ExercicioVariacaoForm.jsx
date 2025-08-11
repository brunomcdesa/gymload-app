import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { Text, View } from 'react-native';
import SaveButton from '../../../components/Button/SaveButton';
import { ComumStyles } from '../../../components/Styles/ComumStyles';

import PropTypes from 'prop-types';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import SelectInput from '../../../components/Inputs/SelectInput';
import TextoInput from '../../../components/Inputs/TextoInput';
import * as EnumApi from '../../../comum/EnumApi';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';

const ExercicioVariacaoForm = (props) => {
  const {
    fabContainer,
    formContainer,
    formLabel,
    formLabelObrigatorio,
    asteriscoObrigatorio,
    inlineContainer,
    inputGroup,
  } = ComumStyles;
  const { navigation, route } = props;
  const { exercicioData } = route.params;
  const { id, nome, tipoExercicio } = exercicioData;
  const [formData, setFormData] = useState({
    exercicioBaseId: id,
    nome: null,
    tipoEquipamento: null,
  });

  const [loading, setLoading] = useState(false);

  const [tipoEquipamentoItems, setTipoEquipamentoItems] = useState([]);
  const [openTipoEquipamentoSelect, setOpenTipoEquipamentoSelect] =
    useState(false);
  const [tipoEquipamentoLoading, setTipoEquipamentoLoading] = useState(false);
  const [tipoEquipamentoSelected, setTipoEquipamentoSelected] = useState(null);

  const isExercicioMusculacao = tipoExercicio === 'MUSCULACAO';
  const isExercicioCalistenia = tipoExercicio === 'CALISTENIA';

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.exercicioBaseId || !formData.tipoEquipamento) {
      throwToastError('Todos os campos são obrigatórios!');
      return;
    }

    try {
      setLoading(true);

      await Api.saveExercicioVariacao(formData);

      throwToastSuccess(`Variação para ${nome} salva com sucesso!`);
      navigation.goBack();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        `Erro ao salvar Variação para ${nome}.`;
      throwToastError(errorMessage);
      console.log('Erro ao salvar novo Exercício.', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchTiposEquipamentosSelect = async () => {
    try {
      setTipoEquipamentoLoading(true);
      const { data } = await EnumApi.fetchTiposEquipamentosSelect();
      setTipoEquipamentoItems(data);
    } catch (error) {
      console.log('Erro ao buscar select de tipos de exercícios.', error);
    } finally {
      setTipoEquipamentoLoading(false);
    }
  };

  useEffect(() => {
    fetchTiposEquipamentosSelect();
  }, []);

  const renderHeaderTitle = useCallback(() => {
    return (
      <HeaderTitle title={`Adicionar Variação para ${nome}`} isForm={true} />
    );
  }, [nome]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
    });
  }, [navigation, renderHeaderTitle]);

  const renderExerciciosCalisteniaFields = () => {
    return (
      isExercicioCalistenia && (
        <View style={inlineContainer}>
          <View style={inputGroup}>
            <View style={formLabelObrigatorio}>
              <Text style={formLabel}>Nome:</Text>
              <Text style={asteriscoObrigatorio}>*</Text>
            </View>
            <TextoInput
              placeholder="Digite o nome"
              value={formData.nome}
              onChangeText={(nomeValue) => handleChange('nome', nomeValue)}
            />
          </View>
        </View>
      )
    );
  };

  const renderExerciciosMusculacaoFields = () => {
    return (
      isExercicioMusculacao && (
        <View style={inlineContainer}>
          <View style={inputGroup}>
            <View style={formLabelObrigatorio}>
              <Text style={formLabel}>Tipo de Equipamento:</Text>
              <Text style={asteriscoObrigatorio}>*</Text>
            </View>
            <SelectInput
              open={openTipoEquipamentoSelect}
              setOpen={setOpenTipoEquipamentoSelect}
              items={tipoEquipamentoItems}
              setItems={setTipoEquipamentoItems}
              value={tipoEquipamentoSelected || ''}
              setValue={setTipoEquipamentoSelected}
              loading={tipoEquipamentoLoading}
              handleChange={handleChange}
              field="tipoEquipamento"
              zIndex={2000}
              zIndexInverse={200}
            />
          </View>
        </View>
      )
    );
  };

  return (
    <View style={formContainer}>
      {renderExerciciosMusculacaoFields()}
      {renderExerciciosCalisteniaFields()}

      <View style={fabContainer}>
        <SaveButton onPress={handleSubmit} loading={loading} />
      </View>
    </View>
  );
};

ExercicioVariacaoForm.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      exercicioData: PropTypes.object,
      isEdicao: PropTypes.bool,
    }),
  }),
};

export default ExercicioVariacaoForm;
