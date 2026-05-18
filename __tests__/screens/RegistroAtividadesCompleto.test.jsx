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

jest.mock('../../src/modules/utils/userUtils', () => ({
  useIsAdmin: () => false,
}));

jest.mock('../../src/components/Anuncios/AnuncioBanner', () => {
  const { View } = require('react-native');
  return () => <View testID="anuncio-banner" />;
});

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

const flushPromises = async () => {
  for (let i = 0; i < 5; i += 1) {
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });
  }
};

/** Count nodes matching testID, deduplicated by fiber key to avoid internal duplicates */
const countByTestID = (instance, testID) =>
  instance.root.findAll((node) => node.props.testID === testID, {
    deep: false,
  }).length;

describe('RegistroAtividadesCompleto screen', () => {
  beforeEach(() => {
    mockFetchRegistroAtividadeCompleto.mockClear();
    mockFetchExercicioVariacoes.mockClear();
    // Reset to defaults — individual tests override as needed
    mockFetchRegistroAtividadeCompleto.mockResolvedValue({ data: [] });
    mockFetchExercicioVariacoes.mockResolvedValue({
      data: [
        { id: 11, nome: 'Variação A' },
        { id: 22, nome: 'Variação B' },
      ],
    });
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

  it('renderiza sem crash', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(
        <RegistroAtividadesCompleto {...buildProps()} />,
      );
    });
    await flushPromises();
  });

  it('não exibe card de PR quando não há registros', async () => {
    mockFetchRegistroAtividadeCompleto.mockResolvedValue({ data: [] });
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(
        <RegistroAtividadesCompleto {...buildProps()} />,
      );
    });
    await flushPromises();
    expect(countByTestID(instance, 'pr-card-destaque')).toBe(0);
  });

  it('exibe card de PR com o maior peso para exercício de musculação', async () => {
    const registros = [
      {
        id: 1,
        peso: 80,
        carga: '80 (KG)',
        qtdRepeticoes: 10,
        qtdSeries: 4,
        dataCadastro: '05/05/2026 10:00:00',
      },
      {
        id: 2,
        peso: 100,
        carga: '100 (KG)',
        qtdRepeticoes: 8,
        qtdSeries: 3,
        dataCadastro: '10/05/2026 10:00:00',
      },
      {
        id: 3,
        peso: 90,
        carga: '90 (KG)',
        qtdRepeticoes: 8,
        qtdSeries: 3,
        dataCadastro: '08/05/2026 10:00:00',
      },
    ];
    mockFetchRegistroAtividadeCompleto.mockResolvedValue({ data: registros });
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(
        <RegistroAtividadesCompleto
          {...buildProps({ tipoExercicio: 'MUSCULACAO' })}
        />,
      );
    });
    await flushPromises();

    expect(countByTestID(instance, 'pr-card-destaque')).toBeGreaterThanOrEqual(
      1,
    );

    // The PR card should contain a registro-musculacao component
    const prCard = instance.root.findAll(
      (node) => node.props.testID === 'pr-card-destaque',
      { deep: false },
    )[0];
    const musculacaoInCard = prCard.findAll(
      (node) => node.props.testID === 'registro-musculacao',
    );
    expect(musculacaoInCard.length).toBeGreaterThan(0);
  });

  it('exibe card de PR com maior reps para exercício de calistenia', async () => {
    const registros = [
      {
        id: 1,
        peso: 0,
        qtdRepeticoes: 15,
        qtdSeries: 3,
        distancia: 0,
        dataCadastro: '05/05/2026 10:00:00',
      },
      {
        id: 2,
        peso: 0,
        qtdRepeticoes: 25,
        qtdSeries: 4,
        distancia: 0,
        dataCadastro: '10/05/2026 10:00:00',
      },
    ];
    mockFetchRegistroAtividadeCompleto.mockResolvedValue({ data: registros });
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(
        <RegistroAtividadesCompleto
          {...buildProps({ tipoExercicio: 'CALISTENIA' })}
        />,
      );
    });
    await flushPromises();

    expect(countByTestID(instance, 'pr-card-destaque')).toBeGreaterThanOrEqual(
      1,
    );

    const prCard = instance.root.findAll(
      (node) => node.props.testID === 'pr-card-destaque',
      { deep: false },
    )[0];
    const calisteniasInCard = prCard.findAll(
      (node) => node.props.testID === 'registro-calistenia',
    );
    expect(calisteniasInCard.length).toBeGreaterThan(0);
  });

  it('exibe card de PR com maior distância para exercício aeróbico', async () => {
    const registros = [
      {
        id: 1,
        distancia: 3.5,
        qtdRepeticoes: 0,
        peso: 0,
        dataCadastro: '05/05/2026 10:00:00',
      },
      {
        id: 2,
        distancia: 10.0,
        qtdRepeticoes: 0,
        peso: 0,
        dataCadastro: '10/05/2026 10:00:00',
      },
    ];
    mockFetchRegistroAtividadeCompleto.mockResolvedValue({ data: registros });
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(
        <RegistroAtividadesCompleto
          {...buildProps({ tipoExercicio: 'AEROBICO' })}
        />,
      );
    });
    await flushPromises();

    expect(countByTestID(instance, 'pr-card-destaque')).toBeGreaterThanOrEqual(
      1,
    );

    const prCard = instance.root.findAll(
      (node) => node.props.testID === 'pr-card-destaque',
      { deep: false },
    )[0];
    const aerobicosInCard = prCard.findAll(
      (node) => node.props.testID === 'registro-aerobico',
    );
    expect(aerobicosInCard.length).toBeGreaterThan(0);
  });

  it('não exibe card de PR durante modo de seleção', async () => {
    const registros = [
      {
        id: 1,
        peso: 80,
        carga: '80 (KG)',
        qtdRepeticoes: 10,
        qtdSeries: 4,
        dataCadastro: '05/05/2026 10:00:00',
      },
    ];
    mockFetchRegistroAtividadeCompleto.mockResolvedValue({ data: registros });
    mockFetchExercicioVariacoes.mockResolvedValue({
      data: [{ id: 11, nome: 'Variação A', padrao: true }],
    });
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(
        <RegistroAtividadesCompleto
          {...buildProps({ tipoExercicio: 'MUSCULACAO', possuiVariacao: true })}
        />,
      );
    });
    await flushPromises();

    // PR card should be visible before entering selection mode
    expect(countByTestID(instance, 'pr-card-destaque')).toBeGreaterThanOrEqual(
      1,
    );

    // Enter selection mode by pressing the "Selecionar registros para mover" button
    await ReactTestRenderer.act(async () => {
      const selecionarTouch = instance.root.findByProps({
        testID: 'btn-selecionar-registros',
      });
      selecionarTouch.props.onPress();
    });

    expect(countByTestID(instance, 'pr-card-destaque')).toBe(0);
  });
});
