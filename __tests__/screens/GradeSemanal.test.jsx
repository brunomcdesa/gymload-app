import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

const mockFetchGrade = jest.fn();
const mockFetchTreinoHoje = jest.fn();
const mockSalvarDia = jest.fn();
const mockRemoverDia = jest.fn();
const mockFetchTreinos = jest.fn();
const mockThrowToastError = jest.fn();
const mockThrowToastSuccess = jest.fn();
const mockShowActionSheet = jest.fn();

jest.mock('../../src/modules/gradeSemanal/Api', () => ({
  fetchGradeSemanal: (...args) => mockFetchGrade(...args),
  fetchTreinoHoje: (...args) => mockFetchTreinoHoje(...args),
  salvarDia: (...args) => mockSalvarDia(...args),
  removerDia: (...args) => mockRemoverDia(...args),
}));

jest.mock('../../src/modules/treinos/Api', () => ({
  fetchTreinos: (...args) => mockFetchTreinos(...args),
}));

jest.mock('../../src/modules/utils/toastUtils', () => ({
  throwToastError: (...args) => mockThrowToastError(...args),
  throwToastSuccess: (...args) => mockThrowToastSuccess(...args),
}));

jest.mock('@expo/react-native-action-sheet', () => ({
  useActionSheet: () => ({
    showActionSheetWithOptions: (...args) => mockShowActionSheet(...args),
  }),
}));

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: (cb) => {
    const { useEffect } = require('react');
    useEffect(() => {
      cb();
    }, []);
  },
}));

jest.mock('../../src/components/Header/HeaderTitle', () => {
  const { Text } = require('react-native');
  return ({ title }) => <Text testID="header-title">{title}</Text>;
});

jest.mock('../../src/components/Loading/LoadingIndicator', () => {
  const { View } = require('react-native');
  return () => <View testID="loading-indicator" />;
});

jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const { Text } = require('react-native');
  return ({ name }) => <Text testID={`icon-${name}`}>{name}</Text>;
});

import GradeSemanal from '../../src/modules/gradeSemanal/screens/GradeSemanal';

const buildProps = () => ({
  navigation: {
    goBack: jest.fn(),
    setOptions: jest.fn(),
  },
});

const treinosFixture = [
  { id: 1, nome: 'Treino A' },
  { id: 2, nome: 'Treino B' },
];

const gradeFixture = [
  { diaSemana: 'SEGUNDA', treinoId: 1, treinoNome: 'Treino A' },
  { diaSemana: 'QUARTA', treinoId: 2, treinoNome: 'Treino B' },
];

describe('GradeSemanal screen', () => {
  beforeEach(() => {
    mockFetchGrade.mockResolvedValue({ data: gradeFixture });
    mockFetchTreinos.mockResolvedValue({ data: treinosFixture });
    mockSalvarDia.mockResolvedValue({});
    mockRemoverDia.mockResolvedValue({});
    mockThrowToastError.mockClear();
    mockThrowToastSuccess.mockClear();
    mockSalvarDia.mockClear();
    mockRemoverDia.mockClear();
    mockShowActionSheet.mockClear();
  });

  it('renderiza sem crash', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<GradeSemanal {...buildProps()} />);
    });
  });

  it('configura header sem botão nativo de voltar', async () => {
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<GradeSemanal {...props} />);
    });
    const calls = props.navigation.setOptions.mock.calls;
    const opts = calls[calls.length - 1][0];
    expect(opts.headerTitleAlign).toBe('center');
    expect(opts.gestureEnabled).toBe(false);
    expect(opts.headerLeft()).toBeNull();
    expect(opts.headerBackVisible).toBe(false);
  });

  it('renderiza os 7 dias da semana', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<GradeSemanal {...buildProps()} />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });
    [
      'SEGUNDA',
      'TERCA',
      'QUARTA',
      'QUINTA',
      'SEXTA',
      'SABADO',
      'DOMINGO',
    ].forEach((dia) => {
      const row = instance.root.findAll(
        (n) => n.props.testID === `dia-row-${dia}`,
      );
      expect(row.length).toBeGreaterThan(0);
    });
  });

  it('exibe nome do treino atribuído para o dia carregado', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<GradeSemanal {...buildProps()} />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });
    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('Treino A');
    expect(tree).toContain('Treino B');
  });

  it('chama salvarDia ao escolher treino no action sheet', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<GradeSemanal {...buildProps()} />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    const picker = instance.root.find(
      (n) => n.props.testID === 'dia-picker-TERCA',
    );
    await ReactTestRenderer.act(async () => {
      picker.props.onPress();
    });

    expect(mockShowActionSheet).toHaveBeenCalled();
    const [, callback] = mockShowActionSheet.mock.calls[0];
    await ReactTestRenderer.act(async () => {
      callback(0);
    });

    expect(mockSalvarDia).toHaveBeenCalledWith('TERCA', 1);
    expect(mockThrowToastSuccess).toHaveBeenCalled();
  });

  it('chama removerDia ao escolher Descanso', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<GradeSemanal {...buildProps()} />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    const picker = instance.root.find(
      (n) => n.props.testID === 'dia-picker-SEGUNDA',
    );
    await ReactTestRenderer.act(async () => {
      picker.props.onPress();
    });

    const [{ options }, callback] = mockShowActionSheet.mock.calls[0];
    const descansoIndex = options.indexOf('Descanso');
    await ReactTestRenderer.act(async () => {
      callback(descansoIndex);
    });

    expect(mockRemoverDia).toHaveBeenCalledWith('SEGUNDA');
    expect(mockThrowToastSuccess).toHaveBeenCalled();
  });

  it('ignora seleção do botão Cancelar', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<GradeSemanal {...buildProps()} />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    const picker = instance.root.find(
      (n) => n.props.testID === 'dia-picker-SEXTA',
    );
    await ReactTestRenderer.act(async () => {
      picker.props.onPress();
    });
    const [{ options }, callback] = mockShowActionSheet.mock.calls[0];
    const cancelIndex = options.indexOf('Cancelar');
    await ReactTestRenderer.act(async () => {
      callback(cancelIndex);
    });

    expect(mockSalvarDia).not.toHaveBeenCalled();
    expect(mockRemoverDia).not.toHaveBeenCalled();
  });

  it('reverte estado e exibe toast quando salvarDia rejeita', async () => {
    mockSalvarDia.mockRejectedValueOnce(new Error('fail'));
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<GradeSemanal {...buildProps()} />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    const picker = instance.root.find(
      (n) => n.props.testID === 'dia-picker-QUINTA',
    );
    await ReactTestRenderer.act(async () => {
      picker.props.onPress();
    });
    const [, callback] = mockShowActionSheet.mock.calls[0];
    await ReactTestRenderer.act(async () => {
      callback(0);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    expect(mockThrowToastError).toHaveBeenCalled();
  });

  it('exibe toast de erro se carregar dados falha', async () => {
    mockFetchGrade.mockRejectedValueOnce(new Error('boom'));
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<GradeSemanal {...buildProps()} />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });
    expect(mockThrowToastError).toHaveBeenCalledWith(
      'Erro ao carregar a grade semanal.',
    );
  });

  it('botão Voltar do footer chama navigation.goBack', async () => {
    const props = buildProps();
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<GradeSemanal {...props} />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });
    const btnVoltar = instance.root.findByProps({ testID: 'btn-voltar' });
    await ReactTestRenderer.act(async () => {
      btnVoltar.props.onPress();
    });
    expect(props.navigation.goBack).toHaveBeenCalled();
  });
});
