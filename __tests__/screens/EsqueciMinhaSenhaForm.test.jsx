import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('../../src/modules/usuario/Api', () => ({
  alterarSenha: jest.fn().mockResolvedValue({}),
}));

jest.mock('../../src/modules/utils/toastUtils', () => ({
  throwToastSuccess: jest.fn(),
  throwToastError: jest.fn(),
}));

jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const { Text } = require('react-native');
  return ({ name }) => <Text testID={`icon-${name}`}>{name}</Text>;
});

const mockNavigation = { goBack: jest.fn(), setOptions: jest.fn() };

import * as Api from '../../src/modules/usuario/Api';
import EsqueciMinhaSenhaForm from '../../src/modules/usuario/screens/EsqueciMinhaSenhaForm';
import { throwToastError } from '../../src/modules/utils/toastUtils';

describe('EsqueciMinhaSenhaForm screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    await ReactTestRenderer.act(() => {
      ReactTestRenderer.create(
        <EsqueciMinhaSenhaForm navigation={mockNavigation} />,
      );
    });
  });

  it('renders Redefinir Senha title', async () => {
    let instance;
    await ReactTestRenderer.act(() => {
      instance = ReactTestRenderer.create(
        <EsqueciMinhaSenhaForm navigation={mockNavigation} />,
      );
    });
    expect(JSON.stringify(instance.toJSON())).toContain('Redefinir Senha');
  });

  it('renders identifier placeholder', async () => {
    let instance;
    await ReactTestRenderer.act(() => {
      instance = ReactTestRenderer.create(
        <EsqueciMinhaSenhaForm navigation={mockNavigation} />,
      );
    });
    expect(JSON.stringify(instance.toJSON())).toContain(
      'Digite seu username ou email',
    );
  });

  it('renders password placeholder', async () => {
    let instance;
    await ReactTestRenderer.act(() => {
      instance = ReactTestRenderer.create(
        <EsqueciMinhaSenhaForm navigation={mockNavigation} />,
      );
    });
    expect(JSON.stringify(instance.toJSON())).toContain('Digite a nova senha');
  });

  it('renders ALTERAR SENHA button', async () => {
    let instance;
    await ReactTestRenderer.act(() => {
      instance = ReactTestRenderer.create(
        <EsqueciMinhaSenhaForm navigation={mockNavigation} />,
      );
    });
    expect(JSON.stringify(instance.toJSON())).toContain('ALTERAR SENHA');
  });

  it('renders Voltar button', async () => {
    let instance;
    await ReactTestRenderer.act(() => {
      instance = ReactTestRenderer.create(
        <EsqueciMinhaSenhaForm navigation={mockNavigation} />,
      );
    });
    expect(JSON.stringify(instance.toJSON())).toContain('Voltar');
  });

  it('pressing Voltar calls goBack', async () => {
    let instance;
    await ReactTestRenderer.act(() => {
      instance = ReactTestRenderer.create(
        <EsqueciMinhaSenhaForm navigation={mockNavigation} />,
      );
    });

    const voltarBtn = instance.root.findByProps({ testID: 'btn-voltar' });
    await ReactTestRenderer.act(() => {
      voltarBtn.props.onPress();
    });
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it('shows error toast when identifier is empty', async () => {
    let instance;
    await ReactTestRenderer.act(() => {
      instance = ReactTestRenderer.create(
        <EsqueciMinhaSenhaForm navigation={mockNavigation} />,
      );
    });

    const alterarBtn = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await alterarBtn.props.onPress();
    });
    expect(throwToastError).toHaveBeenCalledWith(
      'Todos os campos são obrigatórios!',
    );
    expect(Api.alterarSenha).not.toHaveBeenCalled();
  });

  it('calls alterarSenha API when form is valid', async () => {
    let instance;
    await ReactTestRenderer.act(() => {
      instance = ReactTestRenderer.create(
        <EsqueciMinhaSenhaForm navigation={mockNavigation} />,
      );
    });

    const inputs = instance.root.findAllByType('TextInput');
    await ReactTestRenderer.act(() => {
      inputs[0].props.onChangeText('meuusername');
      inputs[1].props.onChangeText('novasenha123');
    });

    const alterarBtn = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await alterarBtn.props.onPress();
    });
    expect(Api.alterarSenha).toHaveBeenCalledWith({
      identifier: 'meuusername',
      password: 'novasenha123',
    });
  });
});
