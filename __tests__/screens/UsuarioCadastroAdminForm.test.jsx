import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import UsuarioCadastroAdminForm from '../../src/modules/usuario/screens/UsuarioCadastroAdminForm';

const mockCadastrarAdmin = jest.fn().mockResolvedValue({ data: {} });
jest.mock('../../src/modules/usuario/Api', () => ({
  cadastrarUsuarioAdmin: (...args) => mockCadastrarAdmin(...args),
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

const buildProps = () => ({
  navigation: {
    goBack: mockGoBack,
    setOptions: mockSetOptions,
  },
});

describe('UsuarioCadastroAdminForm', () => {
  beforeEach(() => {
    mockCadastrarAdmin.mockClear();
    mockThrowToastError.mockClear();
    mockThrowToastSuccess.mockClear();
    mockGoBack.mockClear();
    mockSetOptions.mockClear();
  });

  it('renderiza sem crash', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<UsuarioCadastroAdminForm {...buildProps()} />);
    });
  });

  it('configura header canônico', async () => {
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<UsuarioCadastroAdminForm {...props} />);
    });
    const calls = props.navigation.setOptions.mock.calls;
    const opts = calls.find((c) => c[0].headerTitleAlign === 'center')?.[0];
    expect(opts).toBeDefined();
    expect(opts.headerBackVisible).toBe(false);
    expect(opts.gestureEnabled).toBe(false);
    expect(opts.headerLeft()).toBeNull();
  });

  it('exibe toast de erro ao submeter com campos vazios', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(
        <UsuarioCadastroAdminForm {...buildProps()} />,
      );
    });
    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });
    expect(mockThrowToastError).toHaveBeenCalled();
    expect(mockCadastrarAdmin).not.toHaveBeenCalled();
  });

  it('botão Voltar chama goBack', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(
        <UsuarioCadastroAdminForm {...buildProps()} />,
      );
    });
    const btnVoltar = instance.root.findByProps({ testID: 'btn-voltar' });
    await ReactTestRenderer.act(async () => {
      btnVoltar.props.onPress();
    });
    expect(mockGoBack).toHaveBeenCalled();
  });
});
