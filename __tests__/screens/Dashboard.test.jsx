import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

const mockFetchDashboardStats = jest.fn().mockResolvedValue({
  data: {
    streak: 3,
    treinosMes: 10,
    diasSemana: [true, false, true, false, false, false, false],
  },
});

jest.mock('../../src/modules/dashboard/Api', () => ({
  fetchDashboardStats: (...args) => mockFetchDashboardStats(...args),
}));

jest.mock('../../src/context/AuthProvider', () => {
  const { createContext } = require('react');
  return { AuthContext: createContext({ user: { nome: 'Bruno Silva' } }) };
});

jest.mock('../../src/hooks/useScreenTitle', () => ({
  useScreenTitle: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: (cb) => {
    const { useEffect } = require('react');
    useEffect(() => {
      cb();
    }, []);
  },
}));

jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const { Text } = require('react-native');
  return ({ name }) => <Text>{name}</Text>;
});

jest.mock('../../src/components/Anuncios/AnuncioBanner', () => {
  const { View } = require('react-native');
  return () => <View testID="anuncio-banner" />;
});

jest.mock('../../src/modules/utils/toastUtils', () => ({
  throwToastError: jest.fn(),
}));

jest.mock('../../src/comum/constants', () => ({
  HEADER_TITLE_DASHBOARD: 'Dashboard',
  HEADER_SUBTITLE_DASHBOARD: 'Seja bem vindo!',
}));

import Dashboard from '../../src/modules/dashboard/screens/Dashboard';

describe('Dashboard screen', () => {
  beforeEach(() => {
    mockFetchDashboardStats.mockClear();
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
    expect(tree).toContain('"3"');
    expect(mockFetchDashboardStats).toHaveBeenCalledTimes(1);
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
    expect(tree).toContain('"10"');
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
});
