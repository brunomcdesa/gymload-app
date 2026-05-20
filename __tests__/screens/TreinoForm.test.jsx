import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

const mockSaveTreinos = jest.fn().mockResolvedValue({ data: { id: 99 } });
const mockEditarTreinos = jest.fn().mockResolvedValue({ data: {} });
const mockFetchExercicios = jest.fn().mockResolvedValue({ data: [] });
const mockFetchExerciciosDoTreino = jest.fn().mockResolvedValue({ data: [] });
const mockFetchGruposSelect = jest.fn().mockResolvedValue({ data: [] });
const mockFetchGradeSemanal = jest.fn().mockResolvedValue({ data: [] });
const mockSalvarDia = jest.fn().mockResolvedValue({});
const mockRemoverDia = jest.fn().mockResolvedValue({});
const mockThrowToastError = jest.fn();
const mockThrowToastSuccess = jest.fn();

jest.mock('../../src/modules/treinos/Api', () => ({
  saveTreinos: (...args) => mockSaveTreinos(...args),
  editarTreinos: (...args) => mockEditarTreinos(...args),
}));

jest.mock('../../src/modules/exercicios/Api', () => ({
  fetchExercicios: (...args) => mockFetchExercicios(...args),
  fetchExerciciosDoTreino: (...args) => mockFetchExerciciosDoTreino(...args),
}));

jest.mock('../../src/modules/gruposMusculares/Api', () => ({
  fetchGruposMuscularesSelect: (...args) => mockFetchGruposSelect(...args),
}));

jest.mock('../../src/modules/gradeSemanal/Api', () => ({
  fetchGradeSemanal: (...args) => mockFetchGradeSemanal(...args),
  salvarDia: (...args) => mockSalvarDia(...args),
  removerDia: (...args) => mockRemoverDia(...args),
}));

jest.mock('../../src/modules/utils/toastUtils', () => ({
  throwToastError: (...args) => mockThrowToastError(...args),
  throwToastSuccess: (...args) => mockThrowToastSuccess(...args),
}));

jest.mock('../../src/context/AuthProvider', () => ({
  AuthContext: require('react').createContext({ user: { sexo: null } }),
}));

jest.mock('../../src/modules/utils/iconesUtils', () => ({
  renderIconeGrupoMuscular: () => null,
  renderIconeTipoExercicio: () => null,
}));

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: (cb) => {
    const React = require('react');
    React.useEffect(() => {
      const cleanup = cb();
      return cleanup;
    }, [cb]);
  },
}));

jest.mock('../../src/components/Header/HeaderTitle', () => {
  const { Text } = require('react-native');
  return ({ title }) => <Text testID="header-title">{title}</Text>;
});

jest.mock('../../src/components/Inputs/TextoInput', () => {
  const { TextInput } = require('react-native');
  return ({ placeholder, value, onChangeText, testID }) => (
    <TextInput
      testID={testID || placeholder}
      placeholder={placeholder}
      value={value || ''}
      onChangeText={onChangeText}
    />
  );
});

jest.mock('../../src/components/List/EmptyList', () => {
  const { View } = require('react-native');
  return () => <View testID="empty-list" />;
});

jest.mock('../../src/components/List/SeparatorItem', () => {
  const { View } = require('react-native');
  return () => <View testID="separator" />;
});

jest.mock('../../src/components/Loading/LoadingIndicator', () => {
  const { View } = require('react-native');
  return () => <View testID="loading-indicator" />;
});

jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const { Text } = require('react-native');
  return ({ name }) => <Text testID={`icon-${name}`}>{name}</Text>;
});

jest.mock('../../src/components/Dialog/ConfirmDialog', () => {
  const { View, TouchableOpacity } = require('react-native');
  return ({ visible, onConfirm, onCancel }) =>
    visible ? (
      <View testID="confirm-dialog">
        <TouchableOpacity testID="dialog-btn-confirmar" onPress={onConfirm} />
        <TouchableOpacity testID="dialog-btn-cancelar" onPress={onCancel} />
      </View>
    ) : null;
});

import TreinoForm from '../../src/modules/treinos/screens/TreinoForm';

const buildProps = ({
  treinoData = { id: null, nome: null, exerciciosIds: [] },
  isEdicao = false,
} = {}) => ({
  navigation: {
    goBack: jest.fn(),
    setOptions: jest.fn(),
    navigate: jest.fn(),
  },
  route: {
    params: { treinoData, isEdicao },
  },
});

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

describe('TreinoForm screen', () => {
  beforeEach(() => {
    mockSaveTreinos.mockClear();
    mockEditarTreinos.mockClear();
    mockFetchExercicios.mockClear();
    mockFetchExerciciosDoTreino.mockClear();
    mockFetchGruposSelect.mockClear();
    mockFetchGradeSemanal.mockClear();
    mockSalvarDia.mockClear();
    mockRemoverDia.mockClear();
    mockThrowToastError.mockClear();
    mockThrowToastSuccess.mockClear();
  });

  it('renderiza sem crash (criar)', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<TreinoForm {...buildProps()} />);
      await flushPromises();
    });
  });

  it('renderiza sem crash (editar)', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(
        <TreinoForm
          {...buildProps({
            treinoData: { id: 5, nome: 'Treino X', exerciciosIds: [1, 2] },
            isEdicao: true,
          })}
        />,
      );
      await flushPromises();
    });
  });

  it('configura header: título correto ao criar, sem botão nativo de voltar', async () => {
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<TreinoForm {...props} />);
      await flushPromises();
    });

    const calls = props.navigation.setOptions.mock.calls;
    const opts = calls[calls.length - 1][0];
    expect(opts.headerTitleAlign).toBe('center');
    expect(opts.headerBackVisible).toBe(false);
    expect(opts.gestureEnabled).toBe(false);
    expect(opts.headerLeft()).toBeNull();
  });

  it('botão Voltar chama navigation.goBack quando não é edição', async () => {
    let instance;
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<TreinoForm {...props} />);
      await flushPromises();
    });

    const btnVoltar = instance.root.findByProps({ testID: 'btn-voltar' });
    await ReactTestRenderer.act(async () => {
      btnVoltar.props.onPress();
    });

    expect(props.navigation.goBack).toHaveBeenCalled();
  });

  it('valida nome obrigatório: toast de erro, saveTreinos não chamado', async () => {
    let instance;
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<TreinoForm {...props} />);
      await flushPromises();
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockThrowToastError).toHaveBeenCalledWith('Nome é obrigatório.');
    expect(mockSaveTreinos).not.toHaveBeenCalled();
  });

  it('valida exercícios obrigatórios: toast de erro quando nome preenchido mas sem exercícios', async () => {
    let instance;
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<TreinoForm {...props} />);
      await flushPromises();
    });

    const inputNome = instance.root.findByProps({ testID: 'Digite o nome do treino' });
    await ReactTestRenderer.act(async () => {
      inputNome.props.onChangeText('Peito e Tríceps');
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockThrowToastError).toHaveBeenCalledWith('Selecione ao menos um exercício.');
    expect(mockSaveTreinos).not.toHaveBeenCalled();
  });

  it('salva novo treino com sucesso', async () => {
    let instance;
    const props = buildProps({
      treinoData: { id: null, nome: null, exerciciosIds: [1, 2] },
    });
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<TreinoForm {...props} />);
      await flushPromises();
    });

    const inputNome = instance.root.findByProps({ testID: 'Digite o nome do treino' });
    await ReactTestRenderer.act(async () => {
      inputNome.props.onChangeText('Peito e Tríceps');
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockSaveTreinos).toHaveBeenCalled();
    expect(mockThrowToastSuccess).toHaveBeenCalledWith('Treino salvo com sucesso!');
    expect(props.navigation.goBack).toHaveBeenCalled();
  });

  it('edita treino com sucesso chamando editarTreinos', async () => {
    mockFetchExerciciosDoTreino.mockResolvedValue({ data: [{ id: 1 }] });

    let instance;
    const props = buildProps({
      treinoData: { id: 10, nome: 'Treino Antigo', exerciciosIds: [1] },
      isEdicao: true,
    });
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<TreinoForm {...props} />);
      await flushPromises();
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockEditarTreinos).toHaveBeenCalled();
    expect(mockSaveTreinos).not.toHaveBeenCalled();
  });

  it('exibe chips de dias da semana', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<TreinoForm {...buildProps()} />);
      await flushPromises();
    });

    const segChip = instance.root.findByProps({ testID: 'dia-chip-SEGUNDA' });
    const domChip = instance.root.findByProps({ testID: 'dia-chip-DOMINGO' });
    expect(segChip).toBeTruthy();
    expect(domChip).toBeTruthy();
  });

  it('pré-carrega dias do treino em modo edição', async () => {
    mockFetchGradeSemanal.mockResolvedValue({
      data: [
        { diaSemana: 'SEGUNDA', treinoId: 10, treinoNome: 'Treino Antigo' },
        { diaSemana: 'QUARTA', treinoId: 10, treinoNome: 'Treino Antigo' },
      ],
    });

    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(
        <TreinoForm
          {...buildProps({
            treinoData: { id: 10, nome: 'Treino Antigo', exerciciosIds: [1] },
            isEdicao: true,
          })}
        />,
      );
      await flushPromises();
    });

    expect(mockFetchGradeSemanal).toHaveBeenCalled();
  });

  it('exibe ConfirmDialog ao salvar com dia em conflito', async () => {
    mockFetchGradeSemanal.mockResolvedValue({
      data: [{ diaSemana: 'SEGUNDA', treinoId: 55, treinoNome: 'Outro Treino' }],
    });

    let instance;
    const props = buildProps({
      treinoData: { id: null, nome: 'Novo', exerciciosIds: [1] },
    });
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<TreinoForm {...props} />);
      await flushPromises();
    });

    const diaChip = instance.root.findByProps({ testID: 'dia-chip-SEGUNDA' });
    await ReactTestRenderer.act(async () => { diaChip.props.onPress(); });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => { await btnSalvar.props.onPress(); });

    const dialog = instance.root.findByProps({ testID: 'confirm-dialog' });
    expect(dialog).toBeTruthy();
    expect(mockSaveTreinos).not.toHaveBeenCalled();
  });
});
