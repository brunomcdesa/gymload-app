import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

const mockFetchDashboardStats = jest.fn();
const mockFetchTreinoHoje = jest.fn();

jest.mock('../../src/modules/dashboard/Api', () => ({
  fetchDashboardStats: (...args) => mockFetchDashboardStats(...args),
}));

jest.mock('../../src/modules/gradeSemanal/Api', () => ({
  fetchTreinoHoje: (...args) => mockFetchTreinoHoje(...args),
}));

jest.mock('../../src/modules/utils/toastUtils', () => ({
  throwToastError: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useFocusEffect: (cb) => {
    const { useEffect } = require('react');
    useEffect(() => {
      cb();
    }, []);
  },
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('../../src/context/AuthProvider', () => {
  const { createContext } = require('react');
  return { AuthContext: createContext({ user: { nome: 'Bruno' } }) };
});

jest.mock('../../src/hooks/useScreenTitle', () => ({
  useScreenTitle: jest.fn(),
}));

jest.mock('../../src/components/Anuncios/AnuncioBanner', () => {
  const { View } = require('react-native');
  return () => <View testID="anuncio-banner" />;
});

jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const { Text } = require('react-native');
  return ({ name }) => <Text testID={`icon-${name}`}>{name}</Text>;
});

jest.mock('../../src/comum/constants', () => ({
  HEADER_TITLE_DASHBOARD: 'Dashboard',
  HEADER_SUBTITLE_DASHBOARD: 'Seja bem vindo!',
}));

import Dashboard from '../../src/modules/dashboard/screens/Dashboard';

const statsBase = {
  streak: 5,
  treinosMes: 12,
  diasSemana: [true, true, false, true, false, false, false],
  prsEssaSemana: 0,
  recordesRecentes: [],
};

describe('Dashboard screen', () => {
  beforeEach(() => {
    mockFetchDashboardStats.mockResolvedValue({ data: statsBase });
    mockFetchTreinoHoje.mockResolvedValue({ status: 204, data: null });
    mockNavigate.mockClear();
  });

  it('renderiza sem erros', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<Dashboard />);
    });
  });

  it('exibe streak apos carregar dados', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<Dashboard />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('"5"');
    expect(mockFetchDashboardStats).toHaveBeenCalled();
  });

  it('exibe treinosMes apos carregar dados', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<Dashboard />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('"12"');
  });

  it('exibe contagem correta de dias ativos na semana', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<Dashboard />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain(' / 7 dias');
  });

  it('exibe placeholder quando fetchStats falha', async () => {
    mockFetchDashboardStats.mockRejectedValueOnce(new Error('network error'));

    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<Dashboard />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('—');
  });

  it('exibe PRs ESSA SEMANA com valor da API', async () => {
    mockFetchDashboardStats.mockResolvedValue({
      data: { ...statsBase, prsEssaSemana: 3 },
    });
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<Dashboard />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });
    const texts = instance.root.findAllByType(require('react-native').Text);
    const prsText = texts.find((t) => t.props.children === '3');
    expect(prsText).toBeTruthy();
  });

  it('exibe placeholder quando nao ha recordes recentes', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<Dashboard />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });
    const placeholderTexts = instance.root.findAllByType(
      require('react-native').Text,
    );
    const placeholder = placeholderTexts.find(
      (t) =>
        typeof t.props.children === 'string' &&
        t.props.children.includes('Seus recordes pessoais'),
    );
    expect(placeholder).toBeTruthy();
  });

  it('exibe cards de recordes recentes quando ha dados', async () => {
    const recordes = [
      {
        exercicioId: 1,
        exercicioNome: 'Supino',
        tipoExercicio: 'MUSCULACAO',
        valorPr: '100 (KG)',
        dataPr: '2026-05-10',
      },
      {
        exercicioId: 2,
        exercicioNome: 'Corrida',
        tipoExercicio: 'AEROBICO',
        valorPr: '10.5 km',
        dataPr: '2026-05-09',
      },
    ];
    mockFetchDashboardStats.mockResolvedValue({
      data: { ...statsBase, prsEssaSemana: 2, recordesRecentes: recordes },
    });
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<Dashboard />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });
    const card1 = instance.root.findAll(
      (n) => n.props.testID === 'recorde-card-1',
    );
    const card2 = instance.root.findAll(
      (n) => n.props.testID === 'recorde-card-2',
    );
    expect(card1.length).toBeGreaterThan(0);
    expect(card2.length).toBeGreaterThan(0);
  });

  it('navega para RegistroAtividadesCompleto ao tocar em recorde', async () => {
    const recordes = [
      {
        exercicioId: 5,
        exercicioNome: 'Agachamento',
        tipoExercicio: 'MUSCULACAO',
        valorPr: '120 (KG)',
        dataPr: '2026-05-15',
      },
    ];
    mockFetchDashboardStats.mockResolvedValue({
      data: { ...statsBase, recordesRecentes: recordes },
    });
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<Dashboard />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });
    const card = instance.root.find((n) => n.props.testID === 'recorde-card-5');
    await ReactTestRenderer.act(async () => {
      card.props.onPress();
    });
    expect(mockNavigate).toHaveBeenCalledWith('RegistroAtividadesCompleto', {
      exercicio: {
        id: 5,
        nome: 'Agachamento',
        tipoExercicio: 'MUSCULACAO',
        possuiVariacao: undefined,
      },
      variacaoInicial: null,
    });
  });

  it('formata data do PR corretamente', async () => {
    const recordes = [
      {
        exercicioId: 7,
        exercicioNome: 'Rosca',
        tipoExercicio: 'MUSCULACAO',
        valorPr: '40 (KG)',
        dataPr: '2026-01-03',
      },
    ];
    mockFetchDashboardStats.mockResolvedValue({
      data: { ...statsBase, recordesRecentes: recordes },
    });
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<Dashboard />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });
    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('3 JAN');
  });

  it('exibe card "Dia de descanso" quando treino do dia retorna 204', async () => {
    mockFetchTreinoHoje.mockResolvedValue({ status: 204, data: null });
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<Dashboard />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });
    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('descanso');
  });

  it('exibe card com nome do treino e botão INICIAR quando treino atribuído e não concluído', async () => {
    mockFetchTreinoHoje.mockResolvedValue({
      status: 200,
      data: { treinoId: 7, treinoNome: 'Treino A', concluidoHoje: false },
    });
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<Dashboard />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });
    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('Treino A');
    expect(tree).toContain('Iniciar treino de hoje');
  });

  it('exibe card de concluído quando concluidoHoje for true', async () => {
    mockFetchTreinoHoje.mockResolvedValue({
      status: 200,
      data: { treinoId: 8, treinoNome: 'Treino B', concluidoHoje: true },
    });
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<Dashboard />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });
    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('Treino B');
    expect(tree).toContain('Concluído ✓');
    expect(tree).not.toContain('Iniciar treino de hoje');
  });

  it('navega para ListExerciciosTreino ao tocar INICIAR', async () => {
    mockFetchTreinoHoje.mockResolvedValue({
      status: 200,
      data: { treinoId: 9, treinoNome: 'Treino C', concluidoHoje: false },
    });
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<Dashboard />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });
    const btn = instance.root.find(
      (n) => n.props.testID === 'btn-iniciar-treino-hoje',
    );
    await ReactTestRenderer.act(async () => {
      btn.props.onPress();
    });
    expect(mockNavigate).toHaveBeenCalledWith('ListExerciciosTreino', {
      treino: { id: 9, nome: 'Treino C' },
    });
  });

  it('exibe descanso quando fetchTreinoHoje rejeita', async () => {
    mockFetchTreinoHoje.mockRejectedValueOnce(new Error('boom'));
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<Dashboard />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });
    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('descanso');
  });

  it('exibe empty state quando API não retorna recordesRecentes', async () => {
    // Simulates old backend response without the new fields
    mockFetchDashboardStats.mockResolvedValue({
      data: {
        streak: 3,
        treinosMes: 10,
        diasSemana: [false, false, false, false, false, false, false],
      },
    });
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<Dashboard />);
    });
    const texts = instance.root.findAllByType(require('react-native').Text);
    const placeholder = texts.find(
      (t) =>
        typeof t.props.children === 'string' &&
        t.props.children.includes('Seus recordes pessoais'),
    );
    expect(placeholder).toBeTruthy();
  });
});
