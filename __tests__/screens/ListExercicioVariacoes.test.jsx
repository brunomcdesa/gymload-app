import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

const mockFetchExercicioVariacoes = jest.fn().mockResolvedValue({
  data: [
    {
      id: 1,
      nome: 'Pegada fechada',
      grupoMuscular: 'Peitoral',
      ultimaCarga: '50kg',
      ultimaDistancia: null,
      ultimaSerie: null,
    },
    {
      id: 2,
      nome: 'Pegada aberta',
      grupoMuscular: 'Peitoral',
      ultimaCarga: '60kg',
      ultimaDistancia: null,
      ultimaSerie: null,
    },
  ],
});

jest.mock('../../src/modules/exercicios/Api', () => ({
  fetchExercicioVariacoes: (...args) => mockFetchExercicioVariacoes(...args),
}));

jest.mock('../../src/modules/utils/userUtils', () => ({
  useIsAdmin: () => false,
}));

jest.mock('../../src/modules/utils/toastUtils', () => ({
  throwToastError: jest.fn(),
  throwToastSuccess: jest.fn(),
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

jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const { Text } = require('react-native');
  return ({ name }) => <Text testID={`icon-${name}`}>{name}</Text>;
});

import ListExercicioVariacoes from '../../src/modules/exercicios/screens/ListExercicioVariacoes';

const buildProps = () => ({
  navigation: {
    navigate: jest.fn(),
    setOptions: jest.fn(),
  },
  route: {
    params: {
      exercicioBase: {
        id: 7,
        nome: 'Supino',
        tipoExercicio: 'MUSCULACAO',
        possuiVariacao: true,
      },
    },
  },
});

describe('ListExercicioVariacoes screen', () => {
  beforeEach(() => {
    mockFetchExercicioVariacoes.mockClear();
  });

  it('renderiza lista com nome e ultimaCarga das variações', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(
        <ListExercicioVariacoes {...buildProps()} />,
      );
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('Pegada fechada');
    expect(tree).toContain('Pegada aberta');
    expect(tree).toContain('50kg');
    expect(tree).toContain('60kg');
  });
});
