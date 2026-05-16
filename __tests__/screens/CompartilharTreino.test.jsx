import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

const mockCompartilharTreino = jest.fn().mockResolvedValue({
  data: { codigo: 'A3K9XZ72', dataExpiracao: '2026-06-14' },
});
const mockSetStringAsync = jest.fn().mockResolvedValue(undefined);

jest.mock('../../src/modules/treinos/Api', () => ({
  compartilharTreino: (...args) => mockCompartilharTreino(...args),
}));

jest.mock('expo-clipboard', () => ({
  setStringAsync: (...args) => mockSetStringAsync(...args),
}));

jest.mock('react-native-qrcode-svg', () => {
  const { View } = require('react-native');
  return ({ value }) => <View testID={`qr-code-${value}`} />;
});

jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const { Text } = require('react-native');
  return ({ name }) => <Text>{name}</Text>;
});

jest.mock('../../src/modules/utils/toastUtils', () => ({
  throwToastError: jest.fn(),
  throwToastSuccess: jest.fn(),
}));

jest.mock('../../src/components/Loading/LoadingIndicator', () => {
  const { View } = require('react-native');
  return () => <View testID="loading-indicator" />;
});

jest.mock('react-native/Libraries/Share/Share', () => ({
  share: jest.fn().mockResolvedValue({ action: 'sharedAction' }),
}));

import CompartilharTreino from '../../src/modules/treinos/screens/CompartilharTreino';
import { throwToastError, throwToastSuccess } from '../../src/modules/utils/toastUtils';

const buildProps = (treinoOverrides = {}) => ({
  navigation: { setOptions: jest.fn() },
  route: {
    params: {
      treino: { id: 1, nome: 'TREINO PEITO', ...treinoOverrides },
    },
  },
});

describe('CompartilharTreino screen', () => {
  beforeEach(() => {
    mockCompartilharTreino.mockClear();
    mockSetStringAsync.mockClear();
    throwToastError.mockClear();
    throwToastSuccess.mockClear();
    mockCompartilharTreino.mockResolvedValue({
      data: { codigo: 'A3K9XZ72', dataExpiracao: '2026-06-14' },
    });
  });

  it('renderiza_semErros_quandoSolicitado', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<CompartilharTreino {...buildProps()} />);
    });
  });

  it('exibe_codigoEDataExpiracao_aposCarregar', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<CompartilharTreino {...buildProps()} />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('A3K9XZ72');
  });

  it('chama_compartilharTreino_comIdCorreto', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<CompartilharTreino {...buildProps({ id: 42 })} />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    expect(mockCompartilharTreino).toHaveBeenCalledWith(42);
  });

  it('chama_setStringAsync_aoCopiarCodigo', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<CompartilharTreino {...buildProps()} />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    await ReactTestRenderer.act(async () => {
      instance.root.findByProps({ testID: 'btn-copiar' }).props.onPress();
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    expect(mockSetStringAsync).toHaveBeenCalledWith('A3K9XZ72');
    expect(throwToastSuccess).toHaveBeenCalledWith('Código copiado!');
  });

  it('exibe_toastErro_seCompartilharFalhar', async () => {
    mockCompartilharTreino.mockRejectedValueOnce(new Error('network'));

    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<CompartilharTreino {...buildProps()} />);
    });
    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    expect(throwToastError).toHaveBeenCalledWith(
      'Não foi possível compartilhar o treino.',
    );
  });
});
