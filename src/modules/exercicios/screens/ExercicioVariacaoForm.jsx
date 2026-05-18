import PropTypes from 'prop-types';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { Text, View } from 'react-native';
import FormFooter from '../../../components/Button/FormFooter';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import SelectInput from '../../../components/Inputs/SelectInput';
import TextoInput from '../../../components/Inputs/TextoInput';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { fetchTiposVariacoesSelect } from '../../tipovariacao/Api';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from '../style/style';

const ExercicioVariacaoForm = (props) => {
  const { asteriscoObrigatorio, formLabelObrigatorio, inlineContainer } =
    ComumStyles;
  const { navigation, route } = props;
  const { exercicioData } = route.params;
  const { id, nome, tipoExercicio } = exercicioData;
  const [formData, setFormData] = useState({
    exercicioBaseId: id,
    nome: null,
    tipoVariacaoId: null,
  });

  const [loading, setLoading] = useState(false);

  const [tipoVariacaoItems, setTipoVariacaoItems] = useState([]);
  const [openTipoVariacaoSelect, setOpenTipoVariacaoSelect] = useState(false);
  const [tipoVariacaoLoading, setTipoVariacaoLoading] = useState(false);
  const [tipoVariacaoSelected, setTipoVariacaoSelected] = useState(null);

  const isExercicioMusculacao = tipoExercicio === 'MUSCULACAO';
  const isExercicioCalistenia = tipoExercicio === 'CALISTENIA';

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.exercicioBaseId ||
      (isExercicioMusculacao && !formData.tipoVariacaoId) ||
      (isExercicioCalistenia && !formData.nome)
    ) {
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
    } finally {
      setLoading(false);
    }
  };

  const fetchTiposVariacoes = async () => {
    try {
      setTipoVariacaoLoading(true);
      const { data } = await fetchTiposVariacoesSelect();
      setTipoVariacaoItems(data);
    } catch {
      throwToastError('Erro ao buscar tipos de variação.');
    } finally {
      setTipoVariacaoLoading(false);
    }
  };

  useEffect(() => {
    if (isExercicioMusculacao) {
      fetchTiposVariacoes();
    }
  }, [isExercicioMusculacao]);

  const renderHeaderTitle = useCallback(() => {
    return (
      <HeaderTitle title={`Adicionar Variação para ${nome}`} isForm={true} />
    );
  }, [nome]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
      headerTitleAlign: 'center',
      headerLeft: () => null,
      headerBackVisible: false,
      gestureEnabled: false,
    });
  }, [navigation, renderHeaderTitle]);

  const renderExerciciosCalisteniaFields = () => {
    return (
      isExercicioCalistenia && (
        <View style={inlineContainer}>
          <View style={style.inputGroup}>
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
        </View>
      )
    );
  };

  const renderExerciciosMusculacaoFields = () => {
    return (
      isExercicioMusculacao && (
        <View style={inlineContainer}>
          <View style={style.inputGroup}>
            <View style={formLabelObrigatorio}>
              <Text style={style.fieldLabel}>Tipo de Variação:</Text>
              <Text style={asteriscoObrigatorio}>*</Text>
            </View>
            <SelectInput
              open={openTipoVariacaoSelect}
              setOpen={setOpenTipoVariacaoSelect}
              items={tipoVariacaoItems}
              setItems={setTipoVariacaoItems}
              value={tipoVariacaoSelected || ''}
              setValue={setTipoVariacaoSelected}
              loading={tipoVariacaoLoading}
              handleChange={handleChange}
              field="tipoVariacaoId"
              zIndex={2000}
              zIndexInverse={200}
            />
          </View>
        </View>
      )
    );
  };

  return (
    <View style={style.screenContainer}>
      <View style={style.formContent}>
        {renderExerciciosMusculacaoFields()}
        {renderExerciciosCalisteniaFields()}
      </View>

      <FormFooter
        onBack={() => navigation.goBack()}
        onSave={handleSubmit}
        loading={loading}
      />
    </View>
  );
};

ExercicioVariacaoForm.propTypes = {
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

export default ExercicioVariacaoForm;
