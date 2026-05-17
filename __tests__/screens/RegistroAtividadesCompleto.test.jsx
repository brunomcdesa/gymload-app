import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

const mockFetchRegistroAtividadeCompleto = jest
  .fn()
  .mockResolvedValue({ data: [] });
const mockFetchExercicioVariacoes = jest.fn().mockResolvedValue({
  data: [
    { id: 11, nome: 'Variação A' },
    { id: 22, nome: 'Variação B' },
  ],
});

jest.mock('../../src/modules/registrosAtividades/Api', () => ({
  fetchRegistroAtividadeCompleto: (...args) =>
    mockFetchRegistroAtividadeCompleto(...args),
  repetirRegistro: jest.fn().mockResolvedValue({ data: {} }),
  moverRegistros: jest.fn().mockResolvedValue({ data: {} }),
}));

jest.mock('../../src/modules/exercicios/Api', () => ({
  fetchExercicioVariacoes: (...args) => mockFetchExercicioVariacoes(...args),
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

jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  const Icon = ({ name }) => <Text>{name}</Text>;
  return { MaterialIcons: Icon, MaterialCommunityIcons: Icon, AntDesign: Icon };
});

jest.mock('@expo/vector-icons/MaterialIcons', () => {
  const { Text } = require('react-native');
  return ({ name, testID }) => <Text testID={testID}>{name}</Text>;
});

jest.mock(
  '../../src/modules/registrosAtividades/components/RegistroAerobico',
  () => {
    const { View } = require('react-native');
    return () => <View testID="registro-aerobico" />;
  },
);
jest.mock(
  '../../src/modules/registrosAtividades/components/RegistroMusculacao',
  () => {
    const { View } = require('react-native');
    return () => <View testID="registro-musculacao" />;
  },
);
jest.mock(
  '../../src/modules/registrosAtividades/components/RegistroCalistenia',
  () => {
    const { View } = require('react-native');
    return () => <View testID="registro-calistenia" />;
  },
);

import RegistroAtividadesCompleto from '../../src/modules/registrosAtividades/screens/RegistroAtividadesCompleto';

const buildProps = (exercicioOverrides = {}) => ({
  navigation: {
    navigate: jest.fn(),
    setOptions: jest.fn(),
    goBack: jest.fn(),
  },
  route: {
    params: {
      exercicio: {
        id: 7,
        nome: 'Supino',
        tipoExercicio: 'MUSCULACAO',
        possuiVariacao: false,
        ...exercicioOverrides,
      },
    },
  },
});

describe('RegistroAtividadesCompleto screen', () => {
  beforeEach(() => {
    mockFetchRegistroAtividadeCompleto.mockClear();
    mockFetchExercicioVariacoes.mockClear();
  });

  it('não renderiza picker quando possuiVariacao=false', async () => {
    let instance;
    await ReactTestRenderer.act(() => {
      instance = ReactTestRenderer.create(
        <RegistroAtividadesCompleto {...buildProps()} />,
      );
    });
    const tree = JSON.stringify(instance.toJSON());
    expect(tree).not.toContain('Variação A');
    expect(mockFetchExercicioVariacoes).not.toHaveBeenCalled();
  });

  it('renderiza picker e busca variações quando possuiVariacao=true', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(
        <RegistroAtividadesCompleto
          {...buildProps({ possuiVariacao: true })}
        />,
      );
    });
    // aguarda effects
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    expect(mockFetchExercicioVariacoes).toHaveBeenCalledWith(7);
    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('Variação A');
    expect(tree).toContain('Variação B');
  });

  it('recarrega histórico ao trocar a variação selecionada', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(
        <RegistroAtividadesCompleto
          {...buildProps({ possuiVariacao: true })}
        />,
      );
    });
    for (let i = 0; i < 5; i += 1) {
      await ReactTestRenderer.act(async () => {
        await Promise.resolve();
      });
    }

    const callsAntes = mockFetchRegistroAtividadeCompleto.mock.calls.length;

    const chipB = instance.root.findByProps({ testID: 'chip-variacao-22' });
    expect(chipB).toBeDefined();

    await ReactTestRenderer.act(async () => {
      chipB.props.onPress();
    });
    for (let i = 0; i < 5; i += 1) {
      await ReactTestRenderer.act(async () => {
        await Promise.resolve();
      });
    }

    expect(
      mockFetchRegistroAtividadeCompleto.mock.calls.length,
    ).toBeGreaterThan(callsAntes);
    const ultimaChamada =
      mockFetchRegistroAtividadeCompleto.mock.calls.slice(-1)[0][0];
    expect(ultimaChamada.variacaoId).toBe(22);
  });
});
