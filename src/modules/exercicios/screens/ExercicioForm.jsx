import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import AnimatedPressable from '../../../components/Button/AnimatedPressable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { ComumStyles } from '../../../components/Styles/ComumStyles';

import PropTypes from 'prop-types';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import CHeckboxInput from '../../../components/Inputs/CheckboxInput';
import SelectInput from '../../../components/Inputs/SelectInput';
import TextoInput from '../../../components/Inputs/TextoInput';
import * as EnumApi from '../../../comum/EnumApi';
import * as GrupoMuscularApi from '../../gruposMusculares/Api';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from '../style/style';

const ExercicioForm = (props) => {
  const { formLabelObrigatorio, asteriscoObrigatorio, inlineContainer } =
    ComumStyles;
  const { navigation, route } = props;
  const { exercicioData, isEdicao } = route.params;
  const {
    id,
    nome,
    tipoExercicio,
    grupoMuscularId,
    descricao,
    possuiVariacao,
  } = exercicioData;
  const [formData, setFormData] = useState({
    nome: nome || null,
    tipoExercicio: tipoExercicio || null,
    descricao: descricao || null,
    grupoMuscularId: grupoMuscularId || null,
    possuiVariacao: possuiVariacao || false,
  });

  const [loading, setLoading] = useState(false);

  const [gruposMuscularesItems, setGruposMuscularesItems] = useState([]);
  const [openGrupoMuscularSelect, setOpenGrupoMuscularSelect] = useState(false);
  const [gruposMuscularesLoading, setGruposMuscularesLoading] = useState(false);
  const [grupoMuscularIdSelected, setGrupoMuscularIdSelected] = useState(
    grupoMuscularId || null,
  );

  const [tiposExercicioItems, setTiposExercicioItems] = useState([]);
  const [tipoExercicioLoading, setTipoExercicioLoading] = useState(false);
  const [tipoExercicioSelected, setTipoExercicioSelected] = useState(
    tipoExercicio || null,
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
      (isExercicioMusculacao && !formData.grupoMuscularId)
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

  useEffect(() => {
    fetchGruposMuscularesSelect();
    fetchTiposExerciciosSelect();
  }, []);

  const renderHeaderTitle = useCallback(() => {
    const title = isEdicao ? 'Editar Exercício' : 'Adicionar Exercício';
    return <HeaderTitle title={title} isForm={true} />;
  }, [isEdicao]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
      headerTitleAlign: 'center',
      headerLeft: () => null,
      headerBackVisible: false,
      gestureEnabled: false,
    });
  }, [navigation, renderHeaderTitle]);

  const handleSelectTipo = (value) => {
    setTipoExercicioSelected(value);
    handleChange('tipoExercicio', value);
    if (value === 'AEROBICO') {
      handleChange('grupoMuscularId', null);
      setGrupoMuscularIdSelected(null);
    }
  };

  const renderTipoSegmented = () => {
    if (tipoExercicioLoading || tiposExercicioItems.length === 0) {
      return null;
    }
    return (
      <View style={style.fieldContainer}>
        <View style={formLabelObrigatorio}>
          <Text style={style.fieldLabel}>Tipo de Exercício:</Text>
          <Text style={asteriscoObrigatorio}>*</Text>
        </View>
        <View style={style.segmentedRow}>
          {tiposExercicioItems.map((item) => {
            const isActive = tipoExercicioSelected === item.value;
            return (
              <AnimatedPressable
                key={item.value}
                style={[
                  style.segmentedButton,
                  isActive && style.segmentedButtonActive,
                ]}
                onPress={() => handleSelectTipo(item.value)}
              >
                <Text
                  style={[
                    style.segmentedButtonText,
                    isActive && style.segmentedButtonTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </AnimatedPressable>
            );
          })}
        </View>
      </View>
    );
  };

  const renderCamposCondicionais = () => {
    return (
      <View style={inlineContainer}>
        <View style={style.inputGroup}>
          <View style={formLabelObrigatorio}>
            <Text style={style.fieldLabel}>Grupo Muscular:</Text>
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

        <View style={style.inputGroup}>
          <CHeckboxInput
            value={formData.possuiVariacao}
            onChangeValue={(newValue) =>
              handleChange('possuiVariacao', newValue)
            }
            label={'Possui Variação?'}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={style.screenContainer}>
      <View style={style.formContent}>
        {renderTipoSegmented()}

        <View style={style.fieldContainer}>
          <View style={formLabelObrigatorio}>
            <Text style={style.fieldLabel}>Nome:</Text>
            <Text style={asteriscoObrigatorio}>*</Text>
          </View>
          <TextoInput
            placeholder="Digite o nome"
            value={formData.nome}
            onChangeText={(nomeValue) => handleChange('nome', nomeValue)}
          />
        </View>

        <View style={style.fieldContainer}>
          <Text style={style.fieldLabel}>Descrição:</Text>
          <TextoInput
            placeholder="Digite a descrição"
            value={formData.descricao}
            onChangeText={(descricaoValue) =>
              handleChange('descricao', descricaoValue)
            }
          />
        </View>

        {(isExercicioMusculacao || isExercicioCalistenia) &&
          renderCamposCondicionais()}
      </View>

      <View style={style.formFooter}>
        <AnimatedPressable
          testID="btn-voltar"
          style={style.formBackButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={style.formBackButtonText}>Voltar</Text>
        </AnimatedPressable>
        <AnimatedPressable
          testID="btn-salvar"
          style={[style.saveButton, loading && style.saveButtonDisabled]}
          onPress={!loading ? handleSubmit : null}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <MaterialIcons name="save" size={18} color="#fff" />
              <Text style={style.saveButtonText}>SALVAR</Text>
            </>
          )}
        </AnimatedPressable>
      </View>
    </View>
  );
};

ExercicioForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
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
