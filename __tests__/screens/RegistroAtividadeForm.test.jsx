import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

const mockSaveRegistroAtividade = jest
  .fn()
  .mockResolvedValue({ data: { id: 1 } });
const mockEditRegistroAtividade = jest
  .fn()
  .mockResolvedValue({ data: { id: 1 } });
const mockThrowToastError = jest.fn();
const mockThrowToastSuccess = jest.fn();

jest.mock('../../src/modules/registrosAtividades/Api', () => ({
  saveRegistroAtividade: (...args) => mockSaveRegistroAtividade(...args),
  editRegistroAtividade: (...args) => mockEditRegistroAtividade(...args),
}));

jest.mock('../../src/modules/utils/toastUtils', () => ({
  throwToastError: (...args) => mockThrowToastError(...args),
  throwToastSuccess: (...args) => mockThrowToastSuccess(...args),
}));

jest.mock('../../src/comum/EnumApi', () => ({
  fetchUnidadesPesosSelect: jest.fn().mockResolvedValue({ data: [] }),
  fetchTiposPegadasSelect: jest.fn().mockResolvedValue({ data: [] }),
}));

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: (cb) => {
    const React = require('react');
    React.useEffect(() => {
      const cleanup = cb();
      return cleanup;
    }, []);
  },
}));

jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const { Text } = require('react-native');
  return ({ name }) => <Text testID={`icon-${name}`}>{name}</Text>;
});

jest.mock('../../src/components/Button/FormFooter', () => {
  const { TouchableOpacity, Text } = require('react-native');
  return ({ onSave }) => (
    <TouchableOpacity testID="save-button" onPress={onSave}>
      <Text>Salvar</Text>
    </TouchableOpacity>
  );
});

jest.mock('../../src/components/Header/HeaderTitle', () => {
  const { Text } = require('react-native');
  return ({ title, subtitle }) => (
    <Text testID="header-title">
      {title}
      {subtitle ? ` · ${subtitle}` : ''}
    </Text>
  );
});

import RegistroAtividadeForm from '../../src/modules/registrosAtividades/screens/RegistroAtividadeForm';

const baseExercicioData = {
  id: 1,
  nome: 'Supino Reto',
  possuiVariacao: false,
  isExercicioMusculacao: true,
  isExercicioAerobico: false,
  isExercicioCalistenia: false,
};

const buildProps = (overrides = {}) => ({
  navigation: {
    goBack: jest.fn(),
    setOptions: jest.fn(),
  },
  route: {
    params: {
      exercicioData: baseExercicioData,
      registroAtividadeData: {},
      isEdicao: false,
      ...overrides,
    },
  },
});

describe('RegistroAtividadeForm screen', () => {
  beforeEach(() => {
    mockSaveRegistroAtividade.mockClear();
    mockEditRegistroAtividade.mockClear();
    mockThrowToastError.mockClear();
    mockThrowToastSuccess.mockClear();
  });

  it('renders without crashing when exercicio sem variação', async () => {
    await ReactTestRenderer.act(() => {
      ReactTestRenderer.create(<RegistroAtividadeForm {...buildProps()} />);
    });
  });

  it('renders subtitle com nome da variação quando variacaoData presente', async () => {
    const props = buildProps({
      exercicioData: { ...baseExercicioData, possuiVariacao: true },
      variacaoData: { id: 9, nome: 'Pegada fechada' },
    });
    await ReactTestRenderer.act(() => {
      ReactTestRenderer.create(<RegistroAtividadeForm {...props} />);
    });

    const setOptionsCalls = props.navigation.setOptions.mock.calls;
    const lastCall = setOptionsCalls[setOptionsCalls.length - 1][0];
    const headerNode = lastCall.headerTitle();
    expect(JSON.stringify(headerNode)).toContain('Pegada fechada');
  });

  it('bloqueia submit e mostra toast quando possuiVariacao=true e sem variacaoData', async () => {
    let instance;
    const props = buildProps({
      exercicioData: { ...baseExercicioData, possuiVariacao: true },
      variacaoData: null,
    });
    await ReactTestRenderer.act(() => {
      instance = ReactTestRenderer.create(<RegistroAtividadeForm {...props} />);
    });

    const saveBtn = instance.root.findByProps({ testID: 'save-button' });
    await ReactTestRenderer.act(async () => {
      await saveBtn.props.onPress();
    });

    expect(mockThrowToastError).toHaveBeenCalledWith(
      'Selecione uma variação antes de salvar.',
    );
    expect(mockSaveRegistroAtividade).not.toHaveBeenCalled();
  });

  it('inclui variacaoId no payload ao salvar com variação', async () => {
    let instance;
    const props = buildProps({
      exercicioData: { ...baseExercicioData, possuiVariacao: true },
      variacaoData: { id: 42, nome: 'Variação A' },
      registroAtividadeData: {
        peso: 80,
        unidadePeso: 'KG',
        qtdRepeticoes: 10,
        qtdSeries: 3,
      },
    });
    await ReactTestRenderer.act(() => {
      instance = ReactTestRenderer.create(<RegistroAtividadeForm {...props} />);
    });

    const saveBtn = instance.root.findByProps({ testID: 'save-button' });
    await ReactTestRenderer.act(async () => {
      await saveBtn.props.onPress();
    });

    expect(mockSaveRegistroAtividade).toHaveBeenCalled();
    const payload = mockSaveRegistroAtividade.mock.calls[0][0];
    expect(payload.variacaoId).toBe(42);
    expect(payload.exercicioId).toBe(1);
  });
});
