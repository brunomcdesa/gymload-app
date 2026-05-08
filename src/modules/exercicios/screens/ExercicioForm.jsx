import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SaveButton from '../../../components/Button/SaveButton';

import { ComumStyles, colors } from '../../../components/Styles/ComumStyles';

import PropTypes from 'prop-types';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import CHeckboxInput from '../../../components/Inputs/CheckboxInput';
import SelectInput from '../../../components/Inputs/SelectInput';
import TextoInput from '../../../components/Inputs/TextoInput';
import * as EnumApi from '../../../comum/EnumApi';
import * as GrupoMuscularApi from '../../gruposMusculares/Api';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';

const formStyle = StyleSheet.create({
  segmentedRow: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#383838',
  },
  segmentedButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentedButtonActive: {
    backgroundColor: colors.secondary,
  },
  segmentedButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#aaa',
  },
  segmentedButtonTextActive: {
    color: '#fff',
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#e8e8e8',
    marginBottom: 8,
  },
});

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
    });
  }, [navigation, renderHeaderTitle, isEdicao]);

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
      <View>
        <View style={formLabelObrigatorio}>
          <Text style={formLabel}>Tipo de Exercício:</Text>
          <Text style={asteriscoObrigatorio}>*</Text>
        </View>
        <View style={formStyle.segmentedRow}>
          {tiposExercicioItems.map((item) => {
            const isActive = tipoExercicioSelected === item.value;
            return (
              <TouchableOpacity
                key={item.value}
                style={[
                  formStyle.segmentedButton,
                  isActive && formStyle.segmentedButtonActive,
                ]}
                onPress={() => handleSelectTipo(item.value)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    formStyle.segmentedButtonText,
                    isActive && formStyle.segmentedButtonTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderCamposCondicionais = () => {
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
            <CHeckboxInput
              value={formData.possuiVariacao}
              onChangeValue={(newValue) =>
                handleChange('possuiVariacao', newValue)
              }
              label={'Possui Variação?'}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={formContainer}>
      {renderTipoSegmented()}

      <View style={formLabelObrigatorio}>
        <Text style={formLabel}>Nome:</Text>
        <Text style={asteriscoObrigatorio}>*</Text>
      </View>
      <TextoInput
        placeholder="Digite o nome"
        value={formData.nome}
        onChangeText={(nomeValue) => handleChange('nome', nomeValue)}
      />

      <Text style={formLabel}>Descrição:</Text>
      <TextoInput
        placeholder="Digite a descrição"
        value={formData.descricao}
        onChangeText={(descricaoValue) =>
          handleChange('descricao', descricaoValue)
        }
      />

      {(isExercicioMusculacao || isExercicioCalistenia) &&
        renderCamposCondicionais()}

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
