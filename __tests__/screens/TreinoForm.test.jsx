import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

const mockSaveTreinos = jest.fn().mockResolvedValue({ data: {} });
const mockEditarTreinos = jest.fn().mockResolvedValue({ data: {} });
const mockFetchExercicios = jest.fn().mockResolvedValue({ data: [] });
const mockFetchExerciciosDoTreino = jest.fn().mockResolvedValue({ data: [] });
const mockFetchGruposSelect = jest.fn().mockResolvedValue({ data: [] });
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

  it('chama saveTreinos mesmo com nome vazio (sem validação local)', async () => {
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

    expect(mockSaveTreinos).toHaveBeenCalled();
  });

  it('salva novo treino com sucesso', async () => {
    let instance;
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<TreinoForm {...props} />);
      await flushPromises();
    });

    const inputNome = instance.root.findByProps({
      testID: 'Digite o nome do treino',
    });
    await ReactTestRenderer.act(async () => {
      inputNome.props.onChangeText('Peito e Tríceps');
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockSaveTreinos).toHaveBeenCalled();
    expect(mockThrowToastSuccess).toHaveBeenCalledWith(
      'Treino salvo com sucesso!',
    );
    expect(props.navigation.goBack).toHaveBeenCalled();
  });

  it('edita treino com sucesso chamando editarTreinos', async () => {
    let instance;
    const props = buildProps({
      treinoData: { id: 10, nome: 'Treino Antigo', exerciciosIds: [] },
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
});
