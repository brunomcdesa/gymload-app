import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

const mockAlterarSenha = jest.fn().mockResolvedValue({ data: {} });
const mockThrowToastError = jest.fn();
const mockThrowToastSuccess = jest.fn();

jest.mock('../../src/modules/usuario/Api', () => ({
  alterarSenhaUsuarioLogado: (...args) => mockAlterarSenha(...args),
}));

jest.mock('../../src/modules/utils/toastUtils', () => ({
  throwToastError: (...args) => mockThrowToastError(...args),
  throwToastSuccess: (...args) => mockThrowToastSuccess(...args),
}));

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

jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const { Text } = require('react-native');
  return ({ name }) => <Text testID={`icon-${name}`}>{name}</Text>;
});

import AlterarSenhaForm from '../../src/modules/usuario/screens/AlterarSenhaForm';

const buildProps = () => ({
  navigation: {
    goBack: jest.fn(),
    setOptions: jest.fn(),
  },
});

describe('AlterarSenhaForm screen', () => {
  beforeEach(() => {
    mockAlterarSenha.mockClear();
    mockThrowToastError.mockClear();
    mockThrowToastSuccess.mockClear();
  });

  it('renderiza sem crash', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<AlterarSenhaForm {...buildProps()} />);
    });
  });

  it('configura header: título, centralizado, sem botão nativo de voltar', async () => {
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<AlterarSenhaForm {...props} />);
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
      instance = ReactTestRenderer.create(<AlterarSenhaForm {...props} />);
    });

    const btnVoltar = instance.root.findByProps({ testID: 'btn-voltar' });
    await ReactTestRenderer.act(async () => {
      btnVoltar.props.onPress();
    });

    expect(props.navigation.goBack).toHaveBeenCalled();
  });

  it('exibe toast de erro quando campos estão vazios', async () => {
    let instance;
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<AlterarSenhaForm {...props} />);
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockThrowToastError).toHaveBeenCalledWith(
      'Preencha todos os campos.',
    );
    expect(mockAlterarSenha).not.toHaveBeenCalled();
  });

  it('exibe toast de erro quando nova senha tem menos de 6 caracteres', async () => {
    let instance;
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<AlterarSenhaForm {...props} />);
    });

    const inputAtual = instance.root.findByProps({
      testID: 'Digite sua senha atual',
    });
    const inputNova = instance.root.findByProps({
      testID: 'Digite a nova senha',
    });
    const inputConfirmar = instance.root.findByProps({
      testID: 'Repita a nova senha',
    });

    await ReactTestRenderer.act(async () => {
      inputAtual.props.onChangeText('senhaatual');
      inputNova.props.onChangeText('abc');
      inputConfirmar.props.onChangeText('abc');
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockThrowToastError).toHaveBeenCalledWith(
      'A nova senha deve ter pelo menos 6 caracteres.',
    );
    expect(mockAlterarSenha).not.toHaveBeenCalled();
  });

  it('exibe toast de erro quando senhas não coincidem', async () => {
    let instance;
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<AlterarSenhaForm {...props} />);
    });

    const inputAtual = instance.root.findByProps({
      testID: 'Digite sua senha atual',
    });
    const inputNova = instance.root.findByProps({
      testID: 'Digite a nova senha',
    });
    const inputConfirmar = instance.root.findByProps({
      testID: 'Repita a nova senha',
    });

    await ReactTestRenderer.act(async () => {
      inputAtual.props.onChangeText('senhaatual');
      inputNova.props.onChangeText('novaSenha123');
      inputConfirmar.props.onChangeText('diferente123');
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockThrowToastError).toHaveBeenCalledWith(
      'As senhas não coincidem.',
    );
    expect(mockAlterarSenha).not.toHaveBeenCalled();
  });

  it('salva com sucesso e volta', async () => {
    let instance;
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<AlterarSenhaForm {...props} />);
    });

    const inputAtual = instance.root.findByProps({
      testID: 'Digite sua senha atual',
    });
    const inputNova = instance.root.findByProps({
      testID: 'Digite a nova senha',
    });
    const inputConfirmar = instance.root.findByProps({
      testID: 'Repita a nova senha',
    });

    await ReactTestRenderer.act(async () => {
      inputAtual.props.onChangeText('senhaAtual123');
      inputNova.props.onChangeText('novaSenha123');
      inputConfirmar.props.onChangeText('novaSenha123');
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockAlterarSenha).toHaveBeenCalledWith({
      senhaAtual: 'senhaAtual123',
      novaSenha: 'novaSenha123',
    });
    expect(mockThrowToastSuccess).toHaveBeenCalledWith('Senha atualizada!');
    expect(props.navigation.goBack).toHaveBeenCalled();
  });

  it('exibe toast de erro quando API falha', async () => {
    mockAlterarSenha.mockRejectedValueOnce({
      response: { data: { message: 'Senha atual incorreta.' } },
    });

    let instance;
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<AlterarSenhaForm {...props} />);
    });

    const inputAtual = instance.root.findByProps({
      testID: 'Digite sua senha atual',
    });
    const inputNova = instance.root.findByProps({
      testID: 'Digite a nova senha',
    });
    const inputConfirmar = instance.root.findByProps({
      testID: 'Repita a nova senha',
    });

    await ReactTestRenderer.act(async () => {
      inputAtual.props.onChangeText('senhaAtual123');
      inputNova.props.onChangeText('novaSenha123');
      inputConfirmar.props.onChangeText('novaSenha123');
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockThrowToastError).toHaveBeenCalledWith('Senha atual incorreta.');
  });
});
