import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

const mockFetchTiposVariacoes = jest.fn().mockResolvedValue({ data: [] });

jest.mock('../../src/modules/tipovariacao/Api', () => ({
  fetchTiposVariacoes: (...args) => mockFetchTiposVariacoes(...args),
}));

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: (cb) => {
    const React = require('react');
    React.useEffect(() => {
      cb();
    }, []);
  },
  useNavigation: () => ({ goBack: mockGoBack, navigate: mockNavigate }),
}));

jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const { Text } = require('react-native');
  return ({ name }) => <Text testID={`icon-${name}`}>{name}</Text>;
});

jest.mock('../../src/modules/utils/toastUtils', () => ({
  throwToastError: jest.fn(),
  throwToastSuccess: jest.fn(),
}));

jest.mock('../../src/hooks/useScreenTitle', () => ({
  useScreenTitle: () => {},
}));

jest.mock('../../src/components/Inputs/SearchInput', () => {
  const { View } = require('react-native');
  return () => <View testID="search-input" />;
});

jest.mock('../../src/components/Loading/LoadingIndicator', () => {
  const { View } = require('react-native');
  return () => <View testID="loading-indicator" />;
});

jest.mock('../../src/components/List/EmptyList', () => {
  const { View } = require('react-native');
  return () => <View testID="empty-list" />;
});

jest.mock('../../src/components/List/SeparatorItem', () => {
  const { View } = require('react-native');
  return () => <View />;
});

jest.mock('../../src/modules/tipovariacao/components/TipoVariacao', () => {
  const { Text } = require('react-native');
  return ({ item }) => (
    <Text testID={`tipo-variacao-${item.id}`}>{item.nome}</Text>
  );
});

import ListTiposVariacoes from '../../src/modules/tipovariacao/screens/ListTiposVariacoes';

describe('ListTiposVariacoes screen', () => {
  beforeEach(() => {
    mockFetchTiposVariacoes.mockClear();
    mockGoBack.mockClear();
    mockNavigate.mockClear();
    mockFetchTiposVariacoes.mockResolvedValue({ data: [] });
  });

  it('renderiza sem crash com lista vazia', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<ListTiposVariacoes />);
    });
  });

  it('exibe EmptyList quando API retorna lista vazia', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ListTiposVariacoes />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('"empty-list"');
  });

  it('exibe itens quando API retorna dados', async () => {
    mockFetchTiposVariacoes.mockResolvedValue({
      data: [
        { id: 1, nome: 'Drop Set' },
        { id: 2, nome: 'Super Set' },
      ],
    });

    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ListTiposVariacoes />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('Drop Set');
    expect(tree).toContain('Super Set');
  });

  it('botão Voltar chama goBack', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ListTiposVariacoes />);
    });

    const btnVoltar = instance.root.findByProps({ testID: 'btn-voltar' });
    await ReactTestRenderer.act(async () => {
      btnVoltar.props.onPress();
    });

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it('botão ADICIONAR navega para TipoVariacaoForm', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ListTiposVariacoes />);
    });

    const btnAdicionar = instance.root.findByProps({ testID: 'btn-adicionar' });
    await ReactTestRenderer.act(async () => {
      btnAdicionar.props.onPress();
    });

    expect(mockNavigate).toHaveBeenCalledWith('TipoVariacaoForm', {
      tipoVariacaoData: null,
      isEdicao: false,
    });
  });
});
