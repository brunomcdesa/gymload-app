import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

const mockFetchExerciciosDoTreino = jest.fn().mockResolvedValue({ data: [] });
const mockFinalizarTreino = jest.fn().mockResolvedValue({ data: {} });
const mockThrowToastError = jest.fn();
const mockThrowToastSuccess = jest.fn();
const mockFetchDestaques = jest.fn().mockResolvedValue({});

jest.mock('../../src/modules/exercicios/Api', () => ({
  fetchExerciciosDoTreino: (...args) => mockFetchExerciciosDoTreino(...args),
}));

jest.mock('../../src/modules/treinos/Api', () => ({
  finalizarTreino: (...args) => mockFinalizarTreino(...args),
}));

jest.mock('../../src/modules/utils/toastUtils', () => ({
  throwToastError: (...args) => mockThrowToastError(...args),
  throwToastSuccess: (...args) => mockThrowToastSuccess(...args),
}));

jest.mock('../../src/modules/exercicios/utils/exerciciosUtils', () => ({
  fetchDestaquesDosExercicios: (...args) => mockFetchDestaques(...args),
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

jest.mock('../../src/modules/exercicios/components/Exercicio', () => {
  const { View } = require('react-native');
  return () => <View testID="exercicio-item" />;
});

jest.mock('../../src/components/Loading/LoadingIndicator', () => {
  const { View } = require('react-native');
  return () => <View testID="loading-indicator" />;
});

jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const { Text } = require('react-native');
  return ({ name }) => <Text testID={`icon-${name}`}>{name}</Text>;
});

import ListExerciciosTreino from '../../src/modules/exercicios/screens/ListExerciciosTreino';

const buildProps = ({ treino = { id: 1, nome: 'Treino A' } } = {}) => ({
  navigation: {
    goBack: jest.fn(),
    setOptions: jest.fn(),
    navigate: jest.fn(),
  },
  route: {
    params: { treino },
  },
});

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

describe('ListExerciciosTreino screen', () => {
  beforeEach(() => {
    mockFetchExerciciosDoTreino.mockClear();
    mockFinalizarTreino.mockClear();
    mockThrowToastError.mockClear();
    mockThrowToastSuccess.mockClear();
    mockFetchDestaques.mockClear();
  });

  it('renderiza sem crash', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<ListExerciciosTreino {...buildProps()} />);
      await flushPromises();
    });
  });

  it('configura header: título do treino, sem botão nativo de voltar', async () => {
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<ListExerciciosTreino {...props} />);
      await flushPromises();
    });

    const calls = props.navigation.setOptions.mock.calls;
    const opts = calls[calls.length - 1][0];
    expect(opts.headerBackVisible).toBe(false);
    expect(opts.gestureEnabled).toBe(false);
    expect(opts.headerLeft()).toBeNull();
  });

  it('botão Voltar chama navigation.goBack', async () => {
    let instance;
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ListExerciciosTreino {...props} />);
      await flushPromises();
    });

    const btnVoltar = instance.root.findByProps({ testID: 'btn-voltar' });
    await ReactTestRenderer.act(async () => {
      btnVoltar.props.onPress();
    });

    expect(props.navigation.goBack).toHaveBeenCalled();
  });

  it('botão FINALIZAR TREINO chama finalizarTreino e exibe toast de sucesso', async () => {
    let instance;
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ListExerciciosTreino {...props} />);
      await flushPromises();
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockFinalizarTreino).toHaveBeenCalledWith(1);
    expect(mockThrowToastSuccess).toHaveBeenCalledWith(
      'Treino finalizado com sucesso!',
    );
    expect(props.navigation.goBack).toHaveBeenCalled();
  });

  it('exibe toast de erro quando finalizarTreino falha', async () => {
    mockFinalizarTreino.mockRejectedValueOnce({
      response: { data: { message: 'Treino já finalizado.' } },
    });

    let instance;
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ListExerciciosTreino {...props} />);
      await flushPromises();
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockThrowToastError).toHaveBeenCalledWith('Treino já finalizado.');
  });

  it('busca exercícios do treino ao focar', async () => {
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<ListExerciciosTreino {...props} />);
      await flushPromises();
    });

    expect(mockFetchExerciciosDoTreino).toHaveBeenCalledWith(1);
  });
});
