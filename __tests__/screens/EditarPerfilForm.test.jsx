import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

const mockFetchDadosUsuario = jest.fn().mockResolvedValue({
  data: {
    nome: 'Bruno',
    username: 'brunoc',
    email: 'bruno@test.com',
    idade: '30',
    pesoCorporal: '80',
    altura: '1.80',
    sexo: 'MASCULINO',
  },
});
const mockEditarDadosUsuario = jest.fn().mockResolvedValue({ data: {} });
const mockFetchUrlImagemPerfil = jest
  .fn()
  .mockResolvedValue({ data: 'https://img.example.com/foto.jpg' });
const mockThrowToastError = jest.fn();
const mockThrowToastSuccess = jest.fn();

jest.mock('../../src/modules/usuario/Api', () => ({
  fetchDadosUsuarioLogado: (...args) => mockFetchDadosUsuario(...args),
  editarDadosUsuario: (...args) => mockEditarDadosUsuario(...args),
  fetchUrlImagemPerfil: (...args) => mockFetchUrlImagemPerfil(...args),
}));

jest.mock('../../src/modules/utils/toastUtils', () => ({
  throwToastError: (...args) => mockThrowToastError(...args),
  throwToastSuccess: (...args) => mockThrowToastSuccess(...args),
}));

jest.mock('../../src/context/AuthProvider', () => {
  const React = require('react');
  return {
    AuthContext: React.createContext({
      user: { uuid: 'uuid-123', imagemPerfilUrl: null },
      setUser: jest.fn(),
    }),
  };
});

jest.mock('../../src/components/Header/HeaderTitle', () => {
  const { Text } = require('react-native');
  return ({ title }) => <Text testID="header-title">{title}</Text>;
});

jest.mock('../../src/components/Inputs/TextoInput', () => {
  const { TextInput } = require('react-native');
  return ({ placeholder, value, onChangeText }) => (
    <TextInput
      testID={placeholder}
      placeholder={placeholder}
      value={value || ''}
      onChangeText={onChangeText}
    />
  );
});

jest.mock(
  '../../src/components/Selectable/SelectableImage/SelectableImage',
  () => {
    const { View } = require('react-native');
    return () => <View testID="selectable-image" />;
  },
);

jest.mock('../../src/components/Loading/LoadingIndicator', () => {
  const { View } = require('react-native');
  return () => <View testID="loading-indicator" />;
});

jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const { Text } = require('react-native');
  return ({ name }) => <Text testID={`icon-${name}`}>{name}</Text>;
});

import EditarPerfilForm from '../../src/modules/usuario/screens/EditarPerfilForm';

const buildProps = () => ({
  navigation: {
    goBack: jest.fn(),
    setOptions: jest.fn(),
  },
});

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

describe('EditarPerfilForm screen', () => {
  beforeEach(() => {
    mockFetchDadosUsuario.mockClear();
    mockEditarDadosUsuario.mockClear();
    mockFetchUrlImagemPerfil.mockClear();
    mockThrowToastError.mockClear();
    mockThrowToastSuccess.mockClear();
  });

  it('renderiza sem crash e busca dados do usuário', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<EditarPerfilForm {...buildProps()} />);
      await flushPromises();
    });
    expect(mockFetchDadosUsuario).toHaveBeenCalled();
  });

  it('configura header: título "Editar Perfil", centralizado, sem botão nativo', async () => {
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<EditarPerfilForm {...props} />);
      await flushPromises();
    });

    const calls = props.navigation.setOptions.mock.calls;
    const opts = calls[calls.length - 1][0];
    expect(opts.headerTitleAlign).toBe('center');
    expect(opts.gestureEnabled).toBe(false);
    expect(opts.headerLeft()).toBeNull();
  });

  it('botão Voltar chama navigation.goBack', async () => {
    let instance;
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<EditarPerfilForm {...props} />);
      await flushPromises();
    });

    const btnVoltar = instance.root.findByProps({ testID: 'btn-voltar' });
    await ReactTestRenderer.act(async () => {
      btnVoltar.props.onPress();
    });

    expect(props.navigation.goBack).toHaveBeenCalled();
  });

  it('salva perfil com sucesso e exibe toast', async () => {
    let instance;
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<EditarPerfilForm {...props} />);
      await flushPromises();
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockEditarDadosUsuario).toHaveBeenCalled();
    expect(mockThrowToastSuccess).toHaveBeenCalledWith(
      'Perfil atualizado com sucesso!',
    );
    expect(props.navigation.goBack).toHaveBeenCalled();
  });

  it('exibe toast de erro quando API falha', async () => {
    mockEditarDadosUsuario.mockRejectedValueOnce({
      data: [{ message: 'Username já em uso.' }],
    });

    let instance;
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<EditarPerfilForm {...props} />);
      await flushPromises();
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockThrowToastError).toHaveBeenCalledWith('Username já em uso.');
  });
});
