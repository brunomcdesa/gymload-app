import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import SelectableItem from '../../../components/Selectable/SelectableItem/SelectableItem';
import { colors, ComumStyles } from '../../../components/Styles/ComumStyles';
import * as ExerciciosApi from '../../exercicios/Api';
import exerciciosStyle from '../../exercicios/style/style';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import RegistroAerobico from '../components/RegistroAerobico';
import RegistroCalistenia from '../components/RegistroCalistenia';
import RegistroMusculacao from '../components/RegistroMusculacao';
import style from '../style/style';

const MESES = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ',
];

const formatarDataSecao = (dateStr) => {
  const [day, month, year] = dateStr.split('/');
  return `${parseInt(day)} ${MESES[parseInt(month) - 1]} ${year}`;
};

const RegistroAtividadesCompleto = (props) => {
  const {
    listContent,
    sectionHeader,
    sectionHeaderText,
    formFooter,
    backButton,
    backButtonText,
    addButton,
    addButtonText,
    selecionarButton,
    selecionarButtonText,
    selecaoInfoBar,
    selecaoInfoText,
    cancelarSelecaoText,
    cancelarSelecaoButton,
    cancelarSelecaoButtonText,
    moverButton,
    moverButtonDisabled,
    moverButtonText,
    registroSelecionadoContainer,
    selecaoRow,
    selecaoItemContent,
    modalOverlay,
    modalContainer,
    modalTitle,
    modalItem,
    modalItemText,
    modalCancelar,
    modalCancelarText,
  } = style;
  const { chip, chipAtivo, chipInativo, chipText, chipTextAtivo, chipRow } =
    exerciciosStyle;
  const { container, elementContainer } = ComumStyles;
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
  const [modoSelecao, setModoSelecao] = useState(false);
  const [registrosSelecionados, setRegistrosSelecionados] = useState([]);
  const [moverModalVisivel, setMoverModalVisivel] = useState(false);
  const [movendo, setMovendo] = useState(false);

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

  useEffect(() => {
    setModoSelecao(false);
    setRegistrosSelecionados([]);
  }, [variacaoSelecionada?.id]);

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
      headerLeft: () => null,
      headerBackVisible: false,
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
      title: formatarDataSecao(date),
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

  const toggleSelecao = (registroId) => {
    setRegistrosSelecionados((prev) =>
      prev.includes(registroId)
        ? prev.filter((rid) => rid !== registroId)
        : [...prev, registroId],
    );
  };

  const entrarModoSelecao = (registro) => {
    setModoSelecao(true);
    setRegistrosSelecionados([registro.id]);
  };

  const cancelarSelecao = () => {
    setModoSelecao(false);
    setRegistrosSelecionados([]);
  };

  const handleMoverRegistros = async (variacaoDestino) => {
    setMoverModalVisivel(false);
    setMovendo(true);
    try {
      await Api.moverRegistros({
        exercicioId: id,
        registroIds: registrosSelecionados,
        variacaoDestinoId: variacaoDestino.id,
      });
      cancelarSelecao();
      const { data: novasVariacoes } =
        await ExerciciosApi.fetchExercicioVariacoes(id);
      const listaVariacoes = novasVariacoes || [];
      setVariacoes(listaVariacoes);
      const padraoExiste = listaVariacoes.some((v) => v.padrao);
      const novaVariacao = padraoExiste
        ? variacaoSelecionada
        : listaVariacoes[0] || null;
      setVariacaoSelecionada(novaVariacao);
      const { data: registros } = await Api.fetchRegistroAtividadeCompleto({
        exercicioId: id,
        variacaoId: novaVariacao?.id,
      });
      setRegistroAtividadeCompleto(registros);
      throwToastSuccess('Registros movidos com sucesso.');
    } catch {
      throwToastError('Erro ao mover registros.');
    } finally {
      setMovendo(false);
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

  const renderRegistroContent = (registro) => (
    <View>
      {isExercicioAerobico && <RegistroAerobico registroData={registro} />}
      {isExercicioMusculacao && <RegistroMusculacao registroData={registro} />}
      {isExercicioCalistenia && <RegistroCalistenia registroData={registro} />}
    </View>
  );

  const renderItem = ({ item: registro }) => {
    if (modoSelecao) {
      const selecionado = registrosSelecionados.includes(registro.id);
      return (
        <TouchableOpacity
          onPress={() => toggleSelecao(registro.id)}
          activeOpacity={0.7}
        >
          <View
            style={[
              elementContainer,
              selecionado && registroSelecionadoContainer,
            ]}
          >
            <View style={selecaoRow}>
              <MaterialIcons
                name={selecionado ? 'check-box' : 'check-box-outline-blank'}
                size={22}
                color={selecionado ? '#f0a000' : '#666'}
              />
              <View style={selecaoItemContent}>
                {renderRegistroContent(registro)}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <SelectableItem
        item={registro}
        cancelButtonIndex={2}
        options={getOptions}
        onActionSelected={selectOptionsAction}
        onLongPress={() =>
          variacaoSelecionada?.padrao
            ? entrarModoSelecao(registro)
            : redirectToRegistroAtividadeFormEdit(registro)
        }
      >
        {renderRegistroContent(registro)}
      </SelectableItem>
    );
  };

  const renderVariacoesPicker = () => {
    if (!possuiVariacao || variacoes.length === 0) {
      return null;
    }

    return (
      <View>
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
        {variacaoSelecionada?.padrao && !modoSelecao && (
          <TouchableOpacity
            style={selecionarButton}
            onPress={() => setModoSelecao(true)}
          >
            <MaterialIcons name="checklist" size={14} color="#f0c040" />
            <Text style={selecionarButtonText}>
              Selecionar registros para mover
            </Text>
          </TouchableOpacity>
        )}
        {modoSelecao && (
          <View style={selecaoInfoBar}>
            <Text style={selecaoInfoText}>
              {registrosSelecionados.length} selecionado(s)
            </Text>
            <TouchableOpacity onPress={cancelarSelecao}>
              <Text style={cancelarSelecaoText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderMoverModal = () => (
    <Modal
      visible={moverModalVisivel}
      transparent
      animationType="fade"
      onRequestClose={() => setMoverModalVisivel(false)}
    >
      <View style={modalOverlay}>
        <View style={modalContainer}>
          <Text style={modalTitle}>Mover para variação</Text>
          {variacoes
            .filter((v) => !v.padrao)
            .map((variacao) => (
              <TouchableOpacity
                key={variacao.id}
                style={modalItem}
                onPress={() => handleMoverRegistros(variacao)}
              >
                <Text style={modalItemText}>{variacao.nome}</Text>
              </TouchableOpacity>
            ))}
          <TouchableOpacity
            style={modalCancelar}
            onPress={() => setMoverModalVisivel(false)}
          >
            <Text style={modalCancelarText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={container}>
      {renderVariacoesPicker()}
      {loading || movendo ? (
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
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center', paddingVertical: 60 }}>
              <MaterialIcons
                name="fitness-center"
                size={48}
                color={colors.terciary}
              />
              <Text
                style={{
                  color: colors.terciary,
                  marginTop: 12,
                  fontSize: 14,
                  textAlign: 'center',
                }}
              >
                {'Nenhum registro encontrado.\nAdicione o primeiro!'}
              </Text>
            </View>
          )}
        />
      )}

      <View style={formFooter}>
        {modoSelecao ? (
          <>
            <TouchableOpacity
              style={cancelarSelecaoButton}
              onPress={cancelarSelecao}
              disabled={movendo}
            >
              <Text style={cancelarSelecaoButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                moverButton,
                (registrosSelecionados.length === 0 || movendo) &&
                  moverButtonDisabled,
              ]}
              onPress={() => setMoverModalVisivel(true)}
              disabled={registrosSelecionados.length === 0 || movendo}
              activeOpacity={0.8}
            >
              {movendo ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <MaterialIcons name="swap-horiz" size={18} color="#fff" />
                  <Text style={moverButtonText}>
                    {registrosSelecionados.length > 0
                      ? `Mover (${registrosSelecionados.length})`
                      : 'Mover para...'}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={backButtonText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={addButton}
              onPress={redirectToRegistroAtividadeForm}
              activeOpacity={0.8}
            >
              <MaterialIcons name="add" size={18} color="#fff" />
              <Text style={addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {renderMoverModal()}
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
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default RegistroAtividadesCompleto;
