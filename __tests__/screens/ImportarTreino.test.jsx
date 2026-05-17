import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

const mockFetchTreinoCompartilhado = jest.fn().mockResolvedValue({
  data: {
    nomeTreino: 'TREINO PEITO',
    exercicios: [{ id: 1, nome: 'SUPINO RETO' }],
    dataExpiracao: '2026-06-14',
  },
});
const mockImportarTreino = jest.fn().mockResolvedValue({});
const mockNavigate = jest.fn();

jest.mock('../../src/modules/treinos/Api', () => ({
  fetchTreinoCompartilhado: (...args) => mockFetchTreinoCompartilhado(...args),
  importarTreino: (...args) => mockImportarTreino(...args),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate, setOptions: jest.fn() }),
}));

jest.mock('expo-camera', () => ({
  CameraView: require('react-native').View,
  useCameraPermissions: () => [{ granted: true }, jest.fn()],
}));

jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const { Text } = require('react-native');
  return ({ name }) => <Text testID={`icon-${name}`}>{name}</Text>;
});

jest.mock('../../src/modules/utils/toastUtils', () => ({
  throwToastError: jest.fn(),
  throwToastSuccess: jest.fn(),
}));

jest.mock('../../src/components/Camera/CustomCamera', () => {
  const { View } = require('react-native');
  return ({ visible }) => (visible ? <View testID="custom-camera" /> : null);
});

jest.mock('../../src/components/Loading/LoadingIndicator', () => {
  const { View } = require('react-native');
  return () => <View testID="loading-indicator" />;
});

import ImportarTreino from '../../src/modules/treinos/screens/ImportarTreino';
import {
  throwToastError,
  throwToastSuccess,
} from '../../src/modules/utils/toastUtils';

const abrirAbaManualEBuscar = async (instance, codigo) => {
  await ReactTestRenderer.act(async () => {
    instance.root.findByProps({ testID: 'tab-manual' }).props.onPress();
  });
  await ReactTestRenderer.act(async () => {
    instance.root
      .findByProps({ testID: 'input-codigo' })
      .props.onChangeText(codigo);
  });
  await ReactTestRenderer.act(async () => {
    instance.root.findByProps({ testID: 'btn-buscar' }).props.onPress();
  });
  await ReactTestRenderer.act(async () => {
    await Promise.resolve();
  });
};

describe('ImportarTreino screen', () => {
  beforeEach(() => {
    mockFetchTreinoCompartilhado.mockClear();
    mockImportarTreino.mockClear();
    mockNavigate.mockClear();
    throwToastError.mockClear();
    throwToastSuccess.mockClear();
    mockFetchTreinoCompartilhado.mockResolvedValue({
      data: {
        nomeTreino: 'TREINO PEITO',
        exercicios: [{ id: 1, nome: 'SUPINO RETO' }],
        dataExpiracao: '2026-06-14',
      },
    });
  });

  it('renderiza_semErros_quandoSolicitado', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<ImportarTreino />);
    });
  });

  it('exibe_duasAbas_escanearEInserirCodigo', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ImportarTreino />);
    });

    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('Escanear QR');
    expect(tree).toContain('Inserir Código');
  });

  it('busca_preview_aoClicarBuscarTreino_comCodigoManual', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ImportarTreino />);
    });

    await abrirAbaManualEBuscar(instance, 'A3K9XZ72');

    expect(mockFetchTreinoCompartilhado).toHaveBeenCalledWith('A3K9XZ72');
  });

  it('exibe_preview_comNomeEditavel_aposRespostaApi', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ImportarTreino />);
    });

    await abrirAbaManualEBuscar(instance, 'A3K9XZ72');

    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('TREINO PEITO');
    expect(tree).toContain('SUPINO RETO');
  });

  it('chama_importarTreino_comCodigoENome_aoConfirmar', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ImportarTreino />);
    });

    await abrirAbaManualEBuscar(instance, 'A3K9XZ72');

    await ReactTestRenderer.act(async () => {
      instance.root.findByProps({ testID: 'btn-importar' }).props.onPress();
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    expect(mockImportarTreino).toHaveBeenCalledWith({
      codigo: 'A3K9XZ72',
      nome: 'TREINO PEITO',
    });
  });

  it('navega_paraListTreino_aposImportacaoSucesso', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ImportarTreino />);
    });

    await abrirAbaManualEBuscar(instance, 'A3K9XZ72');

    await ReactTestRenderer.act(async () => {
      instance.root.findByProps({ testID: 'btn-importar' }).props.onPress();
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    expect(throwToastSuccess).toHaveBeenCalledWith(
      'Treino importado com sucesso!',
    );
    expect(mockNavigate).toHaveBeenCalledWith('ListTreino');
  });

  it('exibe_toastErro_seCodigoInvalido', async () => {
    mockFetchTreinoCompartilhado.mockRejectedValueOnce(new Error('not found'));

    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ImportarTreino />);
    });

    await ReactTestRenderer.act(async () => {
      instance.root.findByProps({ testID: 'tab-manual' }).props.onPress();
    });
    await ReactTestRenderer.act(async () => {
      instance.root
        .findByProps({ testID: 'input-codigo' })
        .props.onChangeText('INVALIDO');
    });
    await ReactTestRenderer.act(async () => {
      instance.root.findByProps({ testID: 'btn-buscar' }).props.onPress();
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    expect(throwToastError).toHaveBeenCalledWith(
      'Código inválido ou expirado.',
    );
  });
});
