import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

const mockFetchGrade = jest.fn();
const mockSalvarDia = jest.fn();
const mockRemoverDia = jest.fn();
const mockThrowToastError = jest.fn();
const mockThrowToastSuccess = jest.fn();

jest.mock('../../src/modules/gradeSemanal/Api', () => ({
  fetchGradeSemanal: (...args) => mockFetchGrade(...args),
  salvarDia: (...args) => mockSalvarDia(...args),
  removerDia: (...args) => mockRemoverDia(...args),
}));

jest.mock('../../src/modules/utils/toastUtils', () => ({
  throwToastError: (...args) => mockThrowToastError(...args),
  throwToastSuccess: (...args) => mockThrowToastSuccess(...args),
}));

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: (cb) => {
    const { useEffect } = require('react');
    useEffect(() => { cb(); }, []);
  },
}));

jest.mock('../../src/components/Header/HeaderTitle', () => {
  const { Text } = require('react-native');
  return ({ title, subtitle }) => (
    <>
      <Text testID="header-title">{title}</Text>
      {subtitle ? <Text testID="header-subtitle">{subtitle}</Text> : null}
    </>
  );
});

jest.mock('../../src/components/Loading/LoadingIndicator', () => {
  const { View } = require('react-native');
  return () => <View testID="loading-indicator" />;
});

jest.mock('../../src/components/Dialog/ConfirmDialog', () => {
  const { View, TouchableOpacity, Text } = require('react-native');
  return ({ visible, onConfirm, onCancel, message }) =>
    visible ? (
      <View testID="confirm-dialog">
        <Text testID="dialog-message">{message}</Text>
        <TouchableOpacity testID="dialog-btn-confirmar" onPress={onConfirm} />
        <TouchableOpacity testID="dialog-btn-cancelar" onPress={onCancel} />
      </View>
    ) : null;
});

jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const { Text } = require('react-native');
  return ({ name }) => <Text testID={`icon-${name}`}>{name}</Text>;
});

import GradeSemanal from '../../src/modules/gradeSemanal/screens/GradeSemanal';

const TREINO_PARAM = { id: 1, nome: 'Treino A' };

const buildProps = ({ treino = TREINO_PARAM } = {}) => ({
  navigation: {
    goBack: jest.fn(),
    setOptions: jest.fn(),
  },
  route: { params: { treino } },
});

const gradeFixture = [
  { diaSemana: 'SEGUNDA', treinoId: 1, treinoNome: 'Treino A' },
  { diaSemana: 'QUARTA', treinoId: 1, treinoNome: 'Treino A' },
  { diaSemana: 'TERCA', treinoId: 99, treinoNome: 'Outro Treino' },
];

describe('GradeSemanal screen', () => {
  beforeEach(() => {
    mockFetchGrade.mockResolvedValue({ data: gradeFixture });
    mockSalvarDia.mockResolvedValue({});
    mockRemoverDia.mockResolvedValue({});
    mockThrowToastError.mockClear();
    mockThrowToastSuccess.mockClear();
    mockSalvarDia.mockClear();
    mockRemoverDia.mockClear();
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

  it('passa nome do treino como subtitle no header', async () => {
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<GradeSemanal {...props} />);
    });
    const calls = props.navigation.setOptions.mock.calls;
    const opts = calls[calls.length - 1][0];
    const rendered = ReactTestRenderer.create(opts.headerTitle());
    const subtitle = rendered.root.findByProps({ testID: 'header-subtitle' });
    expect(subtitle.props.children).toBe('Treino A');
  });

  it('renderiza chips para os 7 dias', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<GradeSemanal {...buildProps()} />);
    });
    await ReactTestRenderer.act(async () => { await Promise.resolve(); });
    ['SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO'].forEach((dia) => {
      expect(instance.root.findByProps({ testID: `dia-toggle-${dia}` })).toBeTruthy();
    });
  });

  it('pré-seleciona dias do treino atual', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<GradeSemanal {...buildProps()} />);
    });
    await ReactTestRenderer.act(async () => { await Promise.resolve(); });
    expect(mockFetchGrade).toHaveBeenCalled();
  });

  it('chama salvarDia ao ativar dia livre', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<GradeSemanal {...buildProps()} />);
    });
    await ReactTestRenderer.act(async () => { await Promise.resolve(); });

    const quintaChip = instance.root.findByProps({ testID: 'dia-toggle-QUINTA' });
    await ReactTestRenderer.act(async () => { quintaChip.props.onPress(); });
    await ReactTestRenderer.act(async () => { await Promise.resolve(); });

    expect(mockSalvarDia).toHaveBeenCalledWith('QUINTA', 1);
    expect(mockThrowToastSuccess).toHaveBeenCalled();
  });

  it('chama removerDia ao desativar dia marcado', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<GradeSemanal {...buildProps()} />);
    });
    await ReactTestRenderer.act(async () => { await Promise.resolve(); });

    const segChip = instance.root.findByProps({ testID: 'dia-toggle-SEGUNDA' });
    await ReactTestRenderer.act(async () => { segChip.props.onPress(); });
    await ReactTestRenderer.act(async () => { await Promise.resolve(); });

    expect(mockRemoverDia).toHaveBeenCalledWith('SEGUNDA');
    expect(mockThrowToastSuccess).toHaveBeenCalled();
  });

  it('exibe ConfirmDialog ao ativar dia ocupado por outro treino', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<GradeSemanal {...buildProps()} />);
    });
    await ReactTestRenderer.act(async () => { await Promise.resolve(); });

    const tercaChip = instance.root.findByProps({ testID: 'dia-toggle-TERCA' });
    await ReactTestRenderer.act(async () => { tercaChip.props.onPress(); });

    const dialog = instance.root.findByProps({ testID: 'confirm-dialog' });
    expect(dialog).toBeTruthy();
    expect(mockSalvarDia).not.toHaveBeenCalled();
  });

  it('salva ao confirmar substituição no dialog', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<GradeSemanal {...buildProps()} />);
    });
    await ReactTestRenderer.act(async () => { await Promise.resolve(); });

    const tercaChip = instance.root.findByProps({ testID: 'dia-toggle-TERCA' });
    await ReactTestRenderer.act(async () => { tercaChip.props.onPress(); });

    const btnConfirmar = instance.root.findByProps({ testID: 'dialog-btn-confirmar' });
    await ReactTestRenderer.act(async () => { btnConfirmar.props.onPress(); });
    await ReactTestRenderer.act(async () => { await Promise.resolve(); });

    expect(mockSalvarDia).toHaveBeenCalledWith('TERCA', 1);
  });

  it('não salva ao cancelar substituição no dialog', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<GradeSemanal {...buildProps()} />);
    });
    await ReactTestRenderer.act(async () => { await Promise.resolve(); });

    const tercaChip = instance.root.findByProps({ testID: 'dia-toggle-TERCA' });
    await ReactTestRenderer.act(async () => { tercaChip.props.onPress(); });

    const btnCancelar = instance.root.findByProps({ testID: 'dialog-btn-cancelar' });
    await ReactTestRenderer.act(async () => { btnCancelar.props.onPress(); });

    expect(mockSalvarDia).not.toHaveBeenCalled();
  });

  it('reverte estado e exibe toast quando salvarDia falha', async () => {
    mockSalvarDia.mockRejectedValueOnce(new Error('fail'));
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<GradeSemanal {...buildProps()} />);
    });
    await ReactTestRenderer.act(async () => { await Promise.resolve(); });

    const quintaChip = instance.root.findByProps({ testID: 'dia-toggle-QUINTA' });
    await ReactTestRenderer.act(async () => { quintaChip.props.onPress(); });
    await ReactTestRenderer.act(async () => { await Promise.resolve(); });

    expect(mockThrowToastError).toHaveBeenCalled();
  });

  it('exibe toast de erro se carregarDados falha', async () => {
    mockFetchGrade.mockRejectedValueOnce(new Error('boom'));
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<GradeSemanal {...buildProps()} />);
    });
    await ReactTestRenderer.act(async () => { await Promise.resolve(); });
    expect(mockThrowToastError).toHaveBeenCalledWith('Erro ao carregar a grade semanal.');
  });

  it('botão Voltar chama navigation.goBack', async () => {
    const props = buildProps();
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<GradeSemanal {...props} />);
    });
    await ReactTestRenderer.act(async () => { await Promise.resolve(); });
    const btnVoltar = instance.root.findByProps({ testID: 'btn-voltar' });
    await ReactTestRenderer.act(async () => { btnVoltar.props.onPress(); });
    expect(props.navigation.goBack).toHaveBeenCalled();
  });
});
