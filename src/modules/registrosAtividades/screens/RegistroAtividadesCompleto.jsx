import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  ScrollView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import AddButton from '../../../components/Button/AddButton';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import SelectableItem from '../../../components/Selectable/SelectableItem/SelectableItem';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import * as Api from '../Api';

import HeaderTitle from '../../../components/Header/HeaderTitle';
import * as ExerciciosApi from '../../exercicios/Api';
import exerciciosStyle from '../../exercicios/style/style';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import RegistroAerobico from '../components/RegistroAerobico';
import RegistroCalistenia from '../components/RegistroCalistenia';
import RegistroMusculacao from '../components/RegistroMusculacao';
import style from '../style/style';

const RegistroAtividadesCompleto = (props) => {
  const { listContent, sectionHeader, sectionHeaderText } = style;
  const { chip, chipAtivo, chipInativo, chipText, chipTextAtivo, chipRow } =
    exerciciosStyle;
  const { container, fabContainer } = ComumStyles;
  const { navigation, route } = props;
  const {
    exercicio: { id, nome, tipoExercicio, possuiVariacao },
  } = route.params;
  const isExercicioMusculacao = tipoExercicio === 'MUSCULACAO';
  const isExercicioCalistenia = tipoExercicio === 'CALISTENIA';
  const isExercicioAerobico = tipoExercicio === 'AEROBICO';
  const [registroAtividadeCompleto, setRegistroAtividadeCompleto] = useState(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [variacoes, setVariacoes] = useState([]);
  const [variacaoSelecionada, setVariacaoSelecionada] = useState(null);

  const fetchVariacoes = useCallback(async () => {
    try {
      const { data } = await ExerciciosApi.fetchExercicioVariacoes(id);
      setVariacoes(data || []);
      if (data && data.length > 0) {
        setVariacaoSelecionada(data[0]);
      }
    } catch (error) {
      console.error('Erro ao buscar variações do exercício:', error);
      throwToastError('Erro ao buscar variações do exercício.');
    }
  }, [id]);

  useEffect(() => {
    if (possuiVariacao) {
      fetchVariacoes();
    }
  }, [possuiVariacao, fetchVariacoes]);

  const fetchCargas = useCallback(async () => {
    if (possuiVariacao && !variacaoSelecionada?.id) {
      setRegistroAtividadeCompleto([]);
      return;
    }
    try {
      setLoading(true);
      const { data } = await Api.fetchRegistroAtividadeCompleto({
        exercicioId: id,
        variacaoId: variacaoSelecionada?.id,
      });
      setRegistroAtividadeCompleto(data);
    } catch (error) {
      console.error('Erro ao buscar histórico de cargas:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [id, possuiVariacao, variacaoSelecionada]);

  useFocusEffect(
    useCallback(() => {
      fetchCargas();
    }, [fetchCargas]),
  );

  const renderHeaderTitle = useCallback(() => {
    const subtitle = possuiVariacao
      ? variacaoSelecionada?.nome || 'Selecione uma variação'
      : 'Registro Completo';
    return <HeaderTitle title={nome} subtitle={subtitle} />;
  }, [nome, possuiVariacao, variacaoSelecionada]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
    });
  }, [navigation, renderHeaderTitle]);

  const groupRegistrosByDate = (registros) => {
    const grouped = {};

    registros.forEach((registro) => {
      const date = registro.dataCadastro.split(' ')[0];

      if (!grouped[date]) {
        grouped[date] = [];
      }

      grouped[date].push(registro);
    });

    return Object.keys(grouped).map((date) => ({
      title: date,
      data: grouped[date],
    }));
  };

  const groupedRegistros = groupRegistrosByDate(registroAtividadeCompleto);

  const redirectToRegistroAtividadeForm = () => {
    navigation.navigate('RegistroAtividadeForm', {
      exercicioData: {
        id,
        nome,
        possuiVariacao,
        isExercicioMusculacao,
        isExercicioAerobico,
        isExercicioCalistenia,
      },
      variacaoData: variacaoSelecionada,
      registroAtividadeData: {},
      isEdicao: false,
    });
  };

  const redirectToRegistroAtividadeFormEdit = (item) => {
    navigation.navigate('RegistroAtividadeForm', {
      exercicioData: {
        id,
        nome,
        possuiVariacao,
        isExercicioMusculacao,
        isExercicioAerobico,
        isExercicioCalistenia,
      },
      variacaoData: variacaoSelecionada,
      registroAtividadeData: { ...item },
      isEdicao: true,
    });
  };

  const repetirRegistro = async (registroId) => {
    try {
      setLoading(true);
      await Api.repetirRegistro({ exercicioId: id, registroId });
      throwToastSuccess('Registro salvo com sucesso.');
      await fetchCargas();
    } catch (error) {
      throwToastError('Erro ao tentar repetir registro.');
      console.error('Erro ao repetir ou buscar registros:', error);
      setLoading(false);
    }
  };

  const getOptions = ['Editar Registro', 'Repetir Registro', 'Cancelar'];

  const selectOptionsAction = (selectedIndex, item) => {
    switch (selectedIndex) {
      case 0:
        redirectToRegistroAtividadeFormEdit(item);
        break;
      case 1:
        repetirRegistro(item.id);
        break;
      case 2:
        break;
    }
  };

  const renderItem = ({ item: registro }) => (
    <SelectableItem
      item={registro}
      cancelButtonIndex={2}
      options={getOptions}
      onActionSelected={selectOptionsAction}
      onLongPress={() => redirectToRegistroAtividadeFormEdit(registro)}
    >
      <View>
        {isExercicioAerobico && <RegistroAerobico registroData={registro} />}
        {isExercicioMusculacao && (
          <RegistroMusculacao registroData={registro} />
        )}
        {isExercicioCalistenia && (
          <RegistroCalistenia registroData={registro} />
        )}
      </View>
    </SelectableItem>
  );

  const renderVariacoesPicker = () => {
    if (!possuiVariacao || variacoes.length === 0) {
      return null;
    }

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={chipRow}
        style={{ flexShrink: 0 }}
      >
        {variacoes.map((variacao) => {
          const ativo = variacaoSelecionada?.id === variacao.id;
          return (
            <TouchableOpacity
              key={variacao.id}
              testID={`chip-variacao-${variacao.id}`}
              style={[chip, ativo ? chipAtivo : chipInativo]}
              onPress={() => setVariacaoSelecionada(variacao)}
            >
              <Text style={ativo ? chipTextAtivo : chipText}>
                {variacao.nome}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <View style={container}>
      {renderVariacoesPicker()}
      {loading ? (
        <LoadingIndicator />
      ) : (
        <SectionList
          sections={groupedRegistros}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={listContent}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <View style={sectionHeader}>
              <Text style={sectionHeaderText}>{title}</Text>
            </View>
          )}
        />
      )}

      <View style={fabContainer}>
        <AddButton onPress={redirectToRegistroAtividadeForm} />
      </View>
    </View>
  );
};

RegistroAtividadesCompleto.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      exercicio: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

export default RegistroAtividadesCompleto;
