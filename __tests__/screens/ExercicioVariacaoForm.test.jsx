import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

const mockSaveVariacao = jest.fn().mockResolvedValue({ data: {} });
const mockThrowToastError = jest.fn();
const mockThrowToastSuccess = jest.fn();
const mockFetchTiposVariacoesSelect = jest.fn().mockResolvedValue({
  data: [
    { label: 'Unilateral', value: 1 },
    { label: 'Pegada Fechada', value: 2 },
  ],
});

jest.mock('../../src/modules/exercicios/Api', () => ({
  saveExercicioVariacao: (...args) => mockSaveVariacao(...args),
}));

jest.mock('../../src/modules/tipovariacao/Api', () => ({
  fetchTiposVariacoesSelect: (...args) =>
    mockFetchTiposVariacoesSelect(...args),
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

jest.mock('../../src/components/Inputs/SelectInput', () => {
  const { TouchableOpacity } = require('react-native');
  return ({ handleChange, field }) => (
    <TouchableOpacity
      testID="select-tipo-variacao"
      onPress={() => handleChange(field, 1)}
    />
  );
});

jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const { Text } = require('react-native');
  return ({ name }) => <Text testID={`icon-${name}`}>{name}</Text>;
});

import ExercicioVariacaoForm from '../../src/modules/exercicios/screens/ExercicioVariacaoForm';

const buildProps = ({
  exercicioData = { id: 1, nome: 'Supino', tipoExercicio: 'MUSCULACAO' },
  isEdicao = false,
} = {}) => ({
  navigation: {
    goBack: jest.fn(),
    setOptions: jest.fn(),
    navigate: jest.fn(),
  },
  route: {
    params: { exercicioData, isEdicao },
  },
});

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

describe('ExercicioVariacaoForm screen', () => {
  beforeEach(() => {
    mockSaveVariacao.mockClear();
    mockThrowToastError.mockClear();
    mockThrowToastSuccess.mockClear();
    mockFetchTiposVariacoesSelect.mockClear();
  });

  it('renderiza sem crash para MUSCULACAO', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<ExercicioVariacaoForm {...buildProps()} />);
    });
  });

  it('renderiza sem crash para CALISTENIA', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(
        <ExercicioVariacaoForm
          {...buildProps({
            exercicioData: {
              id: 2,
              nome: 'Barra fixa',
              tipoExercicio: 'CALISTENIA',
            },
          })}
        />,
      );
    });
  });

  it('configura header com título "Adicionar Variação para {nome}"', async () => {
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<ExercicioVariacaoForm {...props} />);
    });

    const calls = props.navigation.setOptions.mock.calls;
    const lastOptions = calls[calls.length - 1][0];
    const headerNode = lastOptions.headerTitle();
    expect(JSON.stringify(headerNode)).toContain(
      'Adicionar Variação para Supino',
    );
  });

  it('oculta botão nativo de voltar e centraliza título no header', async () => {
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<ExercicioVariacaoForm {...props} />);
    });

    const calls = props.navigation.setOptions.mock.calls;
    const lastOptions = calls[calls.length - 1][0];
    expect(lastOptions.headerTitleAlign).toBe('center');
    expect(lastOptions.headerBackVisible).toBe(false);
    expect(lastOptions.gestureEnabled).toBe(false);
    expect(lastOptions.headerLeft()).toBeNull();
  });

  it('botão Voltar chama navigation.goBack', async () => {
    let instance;
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ExercicioVariacaoForm {...props} />);
    });

    const btnVoltar = instance.root.findByProps({ testID: 'btn-voltar' });
    await ReactTestRenderer.act(async () => {
      btnVoltar.props.onPress();
    });

    expect(props.navigation.goBack).toHaveBeenCalled();
  });

  it('exibe toast de erro ao salvar MUSCULACAO sem tipoVariacaoId', async () => {
    let instance;
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ExercicioVariacaoForm {...props} />);
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockThrowToastError).toHaveBeenCalledWith(
      'Todos os campos são obrigatórios!',
    );
    expect(mockSaveVariacao).not.toHaveBeenCalled();
  });

  it('exibe toast de erro ao salvar CALISTENIA sem nome', async () => {
    let instance;
    const props = buildProps({
      exercicioData: { id: 3, nome: 'Flexão', tipoExercicio: 'CALISTENIA' },
    });
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ExercicioVariacaoForm {...props} />);
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockThrowToastError).toHaveBeenCalledWith(
      'Todos os campos são obrigatórios!',
    );
    expect(mockSaveVariacao).not.toHaveBeenCalled();
  });

  it('salva variação MUSCULACAO com sucesso e navega de volta', async () => {
    let instance;
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ExercicioVariacaoForm {...props} />);
      await flushPromises();
    });

    const selectInput = instance.root.findByProps({
      testID: 'select-tipo-variacao',
    });
    await ReactTestRenderer.act(async () => {
      selectInput.props.onPress();
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockSaveVariacao).toHaveBeenCalledWith(
      expect.objectContaining({
        exercicioBaseId: 1,
        tipoVariacaoId: 1,
      }),
    );
    expect(mockThrowToastSuccess).toHaveBeenCalledWith(
      'Variação para Supino salva com sucesso!',
    );
    expect(props.navigation.goBack).toHaveBeenCalled();
  });

  it('salva variação CALISTENIA com sucesso e navega de volta', async () => {
    let instance;
    const props = buildProps({
      exercicioData: { id: 7, nome: 'Flexão', tipoExercicio: 'CALISTENIA' },
    });
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ExercicioVariacaoForm {...props} />);
    });

    const nomeInput = instance.root.findByProps({ testID: 'Digite o nome' });
    await ReactTestRenderer.act(async () => {
      nomeInput.props.onChangeText('Diamante');
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockSaveVariacao).toHaveBeenCalledWith(
      expect.objectContaining({
        exercicioBaseId: 7,
        nome: 'Diamante',
      }),
    );
    expect(mockThrowToastSuccess).toHaveBeenCalledWith(
      'Variação para Flexão salva com sucesso!',
    );
    expect(props.navigation.goBack).toHaveBeenCalled();
  });

  it('exibe toast de erro com mensagem da API quando salvar falha', async () => {
    mockSaveVariacao.mockRejectedValueOnce({
      response: { data: { message: 'Variação já existe.' } },
    });

    let instance;
    const props = buildProps({
      exercicioData: { id: 8, nome: 'Flexão', tipoExercicio: 'CALISTENIA' },
    });
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ExercicioVariacaoForm {...props} />);
    });

    const nomeInput = instance.root.findByProps({ testID: 'Digite o nome' });
    await ReactTestRenderer.act(async () => {
      nomeInput.props.onChangeText('Diamante');
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockThrowToastError).toHaveBeenCalledWith('Variação já existe.');
    expect(props.navigation.goBack).not.toHaveBeenCalled();
  });

  it('busca tipos de variação apenas para MUSCULACAO', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<ExercicioVariacaoForm {...buildProps()} />);
      await flushPromises();
    });

    expect(mockFetchTiposVariacoesSelect).toHaveBeenCalledTimes(1);

    mockFetchTiposVariacoesSelect.mockClear();

    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(
        <ExercicioVariacaoForm
          {...buildProps({
            exercicioData: {
              id: 9,
              nome: 'Flexão',
              tipoExercicio: 'CALISTENIA',
            },
          })}
        />,
      );
      await flushPromises();
    });

    expect(mockFetchTiposVariacoesSelect).not.toHaveBeenCalled();
  });
});
