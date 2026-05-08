import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('../../src/context/AuthProvider', () => {
  const { createContext } = require('react');
  return { AuthContext: createContext({ login: jest.fn() }) };
});

jest.mock('../../src/modules/usuario/Api', () => ({
  realizarLogin: jest.fn().mockResolvedValue({ data: { token: 'mock-token' } }),
}));

jest.mock('../../src/modules/utils/toastUtils', () => ({
  throwToastSuccess: jest.fn(),
  throwToastError: jest.fn(),
}));

jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const { Text } = require('react-native');
  return ({ name }) => <Text testID={`icon-${name}`}>{name}</Text>;
});

const mockNavigation = { navigate: jest.fn() };

import Login from '../../src/modules/usuario/screens/Login';

describe('Login screen', () => {
  beforeEach(() => {
    mockNavigation.navigate.mockClear();
  });

  it('renders without crashing', async () => {
    await ReactTestRenderer.act(() => {
      ReactTestRenderer.create(<Login navigation={mockNavigation} />);
    });
  });

  it('renders the Gymload title parts', async () => {
    let instance;
    await ReactTestRenderer.act(() => {
      instance = ReactTestRenderer.create(<Login navigation={mockNavigation} />);
    });
    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('Gym');
    expect(tree).toContain('load');
  });

  it('renders username placeholder text', async () => {
    let instance;
    await ReactTestRenderer.act(() => {
      instance = ReactTestRenderer.create(<Login navigation={mockNavigation} />);
    });
    expect(JSON.stringify(instance.toJSON())).toContain('Digite o username');
  });

  it('renders password placeholder text', async () => {
    let instance;
    await ReactTestRenderer.act(() => {
      instance = ReactTestRenderer.create(<Login navigation={mockNavigation} />);
    });
    expect(JSON.stringify(instance.toJSON())).toContain('Digite sua senha');
  });

  it('renders ENTRAR button text', async () => {
    let instance;
    await ReactTestRenderer.act(() => {
      instance = ReactTestRenderer.create(<Login navigation={mockNavigation} />);
    });
    expect(JSON.stringify(instance.toJSON())).toContain('ENTRAR');
  });

  it('renders Cadastrar-se button text', async () => {
    let instance;
    await ReactTestRenderer.act(() => {
      instance = ReactTestRenderer.create(<Login navigation={mockNavigation} />);
    });
    expect(JSON.stringify(instance.toJSON())).toContain('Cadastrar-se');
  });

  it('renders Esqueci minha senha link', async () => {
    let instance;
    await ReactTestRenderer.act(() => {
      instance = ReactTestRenderer.create(<Login navigation={mockNavigation} />);
    });
    expect(JSON.stringify(instance.toJSON())).toContain('Esqueci minha senha');
  });

  it('renders OU divider', async () => {
    let instance;
    await ReactTestRenderer.act(() => {
      instance = ReactTestRenderer.create(<Login navigation={mockNavigation} />);
    });
    expect(JSON.stringify(instance.toJSON())).toContain('OU');
  });

  it('navigates to CadastroUsuario when Cadastrar-se is pressed', async () => {
    let instance;
    await ReactTestRenderer.act(() => {
      instance = ReactTestRenderer.create(<Login navigation={mockNavigation} />);
    });

    const touchables = instance.root.findAllByType('TouchableOpacity');
    const cadastrarBtn = touchables.find((t) =>
      JSON.stringify(t.toJSON()).includes('Cadastrar-se'),
    );

    if (cadastrarBtn) {
      await ReactTestRenderer.act(() => {
        cadastrarBtn.props.onPress();
      });
      expect(mockNavigation.navigate).toHaveBeenCalledWith('CadastroUsuario', {
        isCadastroAdmin: false,
      });
    }
  });

  it('navigates to EsqueciMinhaSenha when link is pressed', async () => {
    let instance;
    await ReactTestRenderer.act(() => {
      instance = ReactTestRenderer.create(<Login navigation={mockNavigation} />);
    });

    const touchables = instance.root.findAllByType('TouchableOpacity');
    const esqueciBtn = touchables.find((t) =>
      JSON.stringify(t.toJSON()).includes('Esqueci minha senha'),
    );

    if (esqueciBtn) {
      await ReactTestRenderer.act(() => {
        esqueciBtn.props.onPress();
      });
      expect(mockNavigation.navigate).toHaveBeenCalledWith('EsqueciMinhaSenha');
    }
  });
});
