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
import * as GrupoMuscularApi from '../../gruposMusculares/Api';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';

const ExercicioForm = (props) => {
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
  const { exercicioData, isEdicao } = route.params;
  const {
    id,
    nome,
    tipoEquipamento,
    tipoExercicio,
    grupoMuscularId,
    descricao,
  } = exercicioData;
  const [formData, setFormData] = useState({
    nome: nome || null,
    tipoExercicio: tipoExercicio || null,
    descricao: descricao || null,
    grupoMuscularId: grupoMuscularId || null,
    tipoEquipamento: tipoEquipamento || null,
  });

  const [loading, setLoading] = useState(false);

  const [gruposMuscularesItems, setGruposMuscularesItems] = useState([]);
  const [openGrupoMuscularSelect, setOpenGrupoMuscularSelect] = useState(false);
  const [gruposMuscularesLoading, setGruposMuscularesLoading] = useState(false);
  const [grupoMuscularIdSelected, setGrupoMuscularIdSelected] = useState(
    grupoMuscularId || null,
  );

  const [tiposExercicioItems, setTiposExercicioItems] = useState([]);
  const [openTipoExercicioSelect, setOpenTipoExercicioSelect] = useState(false);
  const [tipoExercicioLoading, setTipoExercicioLoading] = useState(false);
  const [tipoExercicioSelected, setTipoExercicioSelected] = useState(
    tipoExercicio || null,
  );

  const [tipoEquipamentoItems, setTipoEquipamentoItems] = useState([]);
  const [openTipoEquipamentoSelect, setOpenTipoEquipamentoSelect] =
    useState(false);
  const [tipoEquipamentoLoading, setTipoEquipamentoLoading] = useState(false);
  const [tipoEquipamentoSelected, setTipoEquipamentoSelected] = useState(
    tipoEquipamento || null,
  );

  const isExercicioMusculacao = tipoExercicioSelected === 'MUSCULACAO';
  const isExercicioCalistenia = tipoExercicioSelected === 'CALISTENIA';

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.nome ||
      !formData.tipoExercicio ||
      (isExercicioMusculacao && !formData.grupoMuscularId) ||
      (isExercicioMusculacao && !formData.tipoEquipamento)
    ) {
      throwToastError('Todos os campos são obrigatórios!');
      return;
    }

    try {
      setLoading(true);
      if (isEdicao) {
        await Api.editarExercicio(id, formData);
      } else {
        await Api.saveExercicio(formData);
      }

      throwToastSuccess('Exercicio salvo com sucesso!');
      navigation.goBack();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || 'Erro ao salvar novo Exercício.';
      throwToastError(errorMessage);
      console.log('Erro ao salvar novo Exercício.', errorMessage);
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
    fetchGruposMuscularesSelect();
    fetchTiposExerciciosSelect();
    fetchTiposEquipamentosSelect();
  }, []);

  const renderHeaderTitle = useCallback(() => {
    const title = isEdicao ? 'Editar Exercício' : 'Adicionar Exercício';
    return <HeaderTitle title={title} isForm={true} />;
  }, [isEdicao]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
    });
  }, [navigation, renderHeaderTitle, isEdicao]);

  const renderExerciciosMusculacaoFields = () => {
    return (
      <View>
        <View style={inlineContainer}>
          <View style={inputGroup}>
            <View style={formLabelObrigatorio}>
              <Text style={formLabel}>Grupo Muscular:</Text>
              <Text style={asteriscoObrigatorio}>*</Text>
            </View>
            <SelectInput
              open={openGrupoMuscularSelect}
              setOpen={setOpenGrupoMuscularSelect}
              items={gruposMuscularesItems}
              setItems={setGruposMuscularesItems}
              value={grupoMuscularIdSelected || ''}
              setValue={setGrupoMuscularIdSelected}
              loading={gruposMuscularesLoading}
              multiple={false}
              handleChange={handleChange}
              field="grupoMuscularId"
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

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
      </View>
    );
  };

  const renderExerciciosCalisteniaFields = () => {
    return (
      <View>
        <View style={inlineContainer}>
          <View style={inputGroup}>
            <View style={formLabelObrigatorio}>
              <Text style={formLabel}>Grupo Muscular:</Text>
              <Text style={asteriscoObrigatorio}>*</Text>
            </View>
            <SelectInput
              open={openGrupoMuscularSelect}
              setOpen={setOpenGrupoMuscularSelect}
              items={gruposMuscularesItems}
              setItems={setGruposMuscularesItems}
              value={grupoMuscularIdSelected || ''}
              setValue={setGrupoMuscularIdSelected}
              loading={gruposMuscularesLoading}
              multiple={false}
              handleChange={handleChange}
              field="grupoMuscularId"
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

        <View style={inputGroup}>
          <View style={formLabelObrigatorio}>
            <Text style={formLabel}>Tipo de Exercício:</Text>
            <Text style={asteriscoObrigatorio}>*</Text>
          </View>
          <SelectInput
            open={openTipoExercicioSelect}
            setOpen={setOpenTipoExercicioSelect}
            items={tiposExercicioItems}
            setItems={setTiposExercicioItems}
            value={tipoExercicioSelected || ''}
            setValue={setTipoExercicioSelected}
            loading={tipoExercicioLoading}
            handleChange={handleChange}
            field="tipoExercicio"
            zIndex={2000}
            zIndexInverse={200}
          />
        </View>
      </View>

      {isExercicioMusculacao && renderExerciciosMusculacaoFields()}
      {isExercicioCalistenia && renderExerciciosCalisteniaFields()}

      <Text style={formLabel}>Descrição:</Text>
      <TextoInput
        placeholder="Digite a descrição"
        value={formData.descricao}
        onChangeText={(descricaoValue) =>
          handleChange('descricao', descricaoValue)
        }
      />

      <View style={fabContainer}>
        <SaveButton onPress={handleSubmit} loading={loading} />
      </View>
    </View>
  );
};

ExercicioForm.propTypes = {
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

export default ExercicioForm;
