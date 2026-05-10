import PropTypes from 'prop-types';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import TextoInput from '../../../components/Inputs/TextoInput';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { handleChangeState } from '../../utils/stateUtils';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from '../style/style';

const GrupoMuscularForm = (props) => {
  const { asteriscoObrigatorio } = ComumStyles;
  const { navigation } = props;
  const [formData, setFormData] = useState({
    nome: null,
    codigo: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    handleChangeState(setFormData, formData, field, value);
  };

  const handleSubmit = async () => {
    if (!formData.nome || !formData.codigo) {
      throwToastError('Todos os campos são obrigatórios!');
      return;
    }

    try {
      setLoading(true);
      await Api.saveGrupoMuscular(formData);
      throwToastSuccess('Grupo Muscular salvo com sucesso!');
      navigation.goBack();
    } catch (error) {
      throwToastError('Erro ao salvar grupo muscular.');
      console.log('Erro ao salvar grupo muscular.', error);
    } finally {
      setLoading(false);
    }
  };

  const renderHeaderTitle = useCallback(() => {
    return <HeaderTitle title={'Adicionar Grupo Muscular'} />;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
      headerTitleAlign: 'center',
      headerLeft: () => null,
      gestureEnabled: false,
    });
  }, [navigation, renderHeaderTitle]);

  return (
    <View style={style.screenContainer}>
      <ScrollView contentContainerStyle={style.scrollContent}>
        <Text style={style.formDescription}>
          Cadastre um novo grupo muscular para usar nos exercícios.
        </Text>
        <Text style={style.requiredNote}>
          Campos com <Text style={asteriscoObrigatorio}>*</Text> são obrigatórios
        </Text>

        <View style={style.fieldContainer}>
          <Text style={style.fieldLabel}>
            Nome <Text style={asteriscoObrigatorio}>*</Text>
          </Text>
          <TextoInput
            placeholder="Digite o nome"
            value={formData.nome}
            onChangeText={(nomeValue) => handleChange('nome', nomeValue)}
          />
        </View>

        <View style={style.fieldContainer}>
          <Text style={style.fieldLabel}>
            Código <Text style={asteriscoObrigatorio}>*</Text>
          </Text>
          <TextoInput
            placeholder="Digite o código"
            value={formData.codigo}
            onChangeText={(codigoValue) => handleChange('codigo', codigoValue)}
          />
        </View>
      </ScrollView>

      <View style={style.formFooter}>
        <TouchableOpacity
          style={style.backButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={style.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.saveButton, loading && style.saveButtonDisabled]}
          onPress={!loading ? handleSubmit : null}
          disabled={loading}
          activeOpacity={0.7}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <MaterialIcons name="save" size={18} color="#fff" style={style.saveButtonIcon} />
              <Text style={style.saveButtonText}>SALVAR</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

GrupoMuscularForm.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

export default GrupoMuscularForm;
