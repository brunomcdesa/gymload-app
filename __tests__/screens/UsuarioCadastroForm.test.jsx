import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import UsuarioCadastroForm from '../../src/modules/usuario/screens/UsuarioCadastroForm';

const mockCadastrarAdmin = jest.fn().mockResolvedValue({ data: {} });
const mockCadastrarUsuario = jest.fn().mockResolvedValue({ data: {} });
jest.mock('../../src/modules/usuario/Api', () => ({
  cadastrarUsuarioAdmin: (...args) => mockCadastrarAdmin(...args),
  cadastrarUsuario: (...args) => mockCadastrarUsuario(...args),
}));

const mockThrowToastError = jest.fn();
const mockThrowToastSuccess = jest.fn();
jest.mock('../../src/modules/utils/toastUtils', () => ({
  throwToastError: (...args) => mockThrowToastError(...args),
  throwToastSuccess: (...args) => mockThrowToastSuccess(...args),
}));

jest.mock('../../src/components/Header/HeaderTitle', () => {
  const { Text } = require('react-native');
  return ({ title }) => <Text testID="header-title">{title}</Text>;
});

jest.mock('../../src/components/Selectable/SelectableImage/SelectableImage', () => {
  const { View } = require('react-native');
  return () => <View testID="selectable-image" />;
});

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: (cb) => {
    const React = require('react');
    React.useEffect(() => {
      const cleanup = cb();
      return cleanup;
    }, []);
  },
}));

const mockGoBack = jest.fn();
const mockSetOptions = jest.fn();
const mockGetParent = jest.fn(() => ({ setOptions: jest.fn() }));

const buildProps = ({ isCadastroAdmin = false } = {}) => ({
  navigation: {
    goBack: mockGoBack,
    setOptions: mockSetOptions,
    getParent: mockGetParent,
  },
  route: { params: { isCadastroAdmin } },
});

describe('UsuarioCadastroForm', () => {
  beforeEach(() => {
    mockCadastrarAdmin.mockClear();
    mockCadastrarUsuario.mockClear();
    mockThrowToastError.mockClear();
    mockThrowToastSuccess.mockClear();
    mockGoBack.mockClear();
    mockSetOptions.mockClear();
  });

  it('renderiza sem crash — modo público', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<UsuarioCadastroForm {...buildProps()} />);
    });
  });

  it('renderiza sem crash — modo admin', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<UsuarioCadastroForm {...buildProps({ isCadastroAdmin: true })} />);
    });
  });

  it('modo público: oculta header', async () => {
    const props = buildProps({ isCadastroAdmin: false });
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<UsuarioCadastroForm {...props} />);
    });
    const calls = props.navigation.setOptions.mock.calls;
    const opts = calls.find((c) => c[0].headerShown === false)?.[0];
    expect(opts).toBeDefined();
  });

  it('modo admin: configura header canônico', async () => {
    const props = buildProps({ isCadastroAdmin: true });
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<UsuarioCadastroForm {...props} />);
    });
    const calls = props.navigation.setOptions.mock.calls;
    const opts = calls.find((c) => c[0].headerTitleAlign === 'center')?.[0];
    expect(opts).toBeDefined();
    expect(opts.headerBackVisible).toBe(false);
    expect(opts.gestureEnabled).toBe(false);
  });

  it('exibe toast de erro ao submeter com campos vazios', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<UsuarioCadastroForm {...buildProps({ isCadastroAdmin: true })} />);
    });
    const btnCadastrar = instance.root.findByProps({ testID: 'btn-cadastrar' });
    await ReactTestRenderer.act(async () => {
      await btnCadastrar.props.onPress();
    });
    expect(mockThrowToastError).toHaveBeenCalled();
    expect(mockCadastrarAdmin).not.toHaveBeenCalled();
  });

  it('botão Voltar chama goBack', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<UsuarioCadastroForm {...buildProps()} />);
    });
    const btnVoltar = instance.root.findByProps({ testID: 'btn-voltar' });
    await ReactTestRenderer.act(async () => {
      btnVoltar.props.onPress();
    });
    expect(mockGoBack).toHaveBeenCalled();
  });
});
