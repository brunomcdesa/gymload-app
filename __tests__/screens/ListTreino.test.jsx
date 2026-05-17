import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

const mockFetchTreinos = jest.fn().mockResolvedValue({ data: [] });
const mockInativarTreino = jest.fn().mockResolvedValue({});
const mockAtivarTreino = jest.fn().mockResolvedValue({});

jest.mock('../../src/modules/treinos/Api', () => ({
  fetchTreinos: (...args) => mockFetchTreinos(...args),
  inativarTreino: (...args) => mockInativarTreino(...args),
  ativarTreino: (...args) => mockAtivarTreino(...args),
}));

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useFocusEffect: (cb) => {
    const React = require('react');
    React.useEffect(() => {
      cb();
    }, []);
  },
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('@expo/react-native-action-sheet', () => ({
  useActionSheet: () => ({
    showActionSheetWithOptions: jest.fn(),
  }),
}));

jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const { Text } = require('react-native');
  return ({ name, testID }) => (
    <Text testID={testID || `icon-${name}`}>{name}</Text>
  );
});

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

jest.mock('../../src/components/Button/AddButton', () => {
  const { View } = require('react-native');
  return () => <View testID="add-button" />;
});

jest.mock(
  '../../src/components/Selectable/SelectableItem/SelectableItem',
  () => {
    const { TouchableOpacity, View } = require('react-native');
    const MockSelectable = ({ children, options, onActionSelected }) => (
      <TouchableOpacity
        testID="selectable-item"
        onPress={() => onActionSelected && onActionSelected(0, {})}
        onLongPress={() => {}}
      >
        <View testID={`options-${options ? options.join(',') : ''}`}>
          {children}
        </View>
      </TouchableOpacity>
    );
    return MockSelectable;
  },
);

import ListTreino from '../../src/modules/treinos/screens/ListTreino';

const treinoAtivo = {
  id: 1,
  nome: 'TREINO PEITO',
  situacao: 'ATIVO',
  dataCadastro: '2025-04-06 00:00:00',
  importado: false,
};

const treinoInativo = {
  id: 2,
  nome: 'TREINO COSTAS',
  situacao: 'INATIVO',
  dataCadastro: '2025-04-06 00:00:00',
  importado: false,
};

const treinoImportado = {
  id: 3,
  nome: 'TREINO IMPORTADO',
  situacao: 'ATIVO',
  dataCadastro: '2025-04-06 00:00:00',
  importado: true,
};

describe('ListTreino screen', () => {
  beforeEach(() => {
    mockFetchTreinos.mockClear();
    mockNavigate.mockClear();
    mockFetchTreinos.mockResolvedValue({ data: [] });
  });

  it('renderiza_semErros_quandoListaVazia', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<ListTreino />);
    });
  });

  it('exibe_chipImportados_naListagem', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ListTreino />);
    });

    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('Importados');
  });

  it('exibe_opcaoCompartilharTreino_quandoTreinoAtivo', async () => {
    mockFetchTreinos.mockResolvedValue({ data: [treinoAtivo] });

    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ListTreino />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('Compartilhar Treino');
  });

  it('naoExibe_opcaoCompartilharTreino_quandoTreinoInativo', async () => {
    mockFetchTreinos.mockResolvedValue({ data: [treinoInativo] });

    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ListTreino />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    const tree = JSON.stringify(instance.toJSON());
    expect(tree).not.toContain('Compartilhar Treino');
  });

  it('exibe_indicadorVisual_quandoTreinoImportado', async () => {
    mockFetchTreinos.mockResolvedValue({ data: [treinoImportado] });

    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ListTreino />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('"importado-indicator"');
  });

  it('naoExibe_indicadorVisual_quandoTreinoNaoImportado', async () => {
    mockFetchTreinos.mockResolvedValue({ data: [treinoAtivo] });

    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ListTreino />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    const tree = JSON.stringify(instance.toJSON());
    expect(tree).not.toContain('"importado-indicator"');
  });

  it('chama_fetchTreinos_comBuscarImportados_quandoAlterarEstado', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<ListTreino />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    expect(mockFetchTreinos).toHaveBeenCalledWith(false, false);
  });
});
