import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

const mockSaveExercicio = jest.fn().mockResolvedValue({ data: {} });
const mockEditarExercicio = jest.fn().mockResolvedValue({ data: {} });
const mockThrowToastError = jest.fn();
const mockThrowToastSuccess = jest.fn();

jest.mock('../../src/modules/exercicios/Api', () => ({
  saveExercicio: (...args) => mockSaveExercicio(...args),
  editarExercicio: (...args) => mockEditarExercicio(...args),
}));

jest.mock('../../src/modules/utils/toastUtils', () => ({
  throwToastError: (...args) => mockThrowToastError(...args),
  throwToastSuccess: (...args) => mockThrowToastSuccess(...args),
}));

jest.mock('../../src/comum/EnumApi', () => ({
  fetchTiposExerciciosSelect: jest.fn().mockResolvedValue({
    data: [
      { label: 'Musculação', value: 'MUSCULACAO' },
      { label: 'Calistenia', value: 'CALISTENIA' },
      { label: 'Aeróbico', value: 'AEROBICO' },
    ],
  }),
}));

jest.mock('../../src/modules/gruposMusculares/Api', () => ({
  fetchGruposMuscularesSelect: jest.fn().mockResolvedValue({
    data: [
      { label: 'Peito', value: 1 },
      { label: 'Costas', value: 2 },
    ],
  }),
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
  const { View } = require('react-native');
  return () => <View testID="select-grupo-muscular" />;
});

jest.mock('../../src/components/Inputs/CheckboxInput', () => {
  const { View } = require('react-native');
  return () => <View testID="checkbox-possui-variacao" />;
});

import ExercicioForm from '../../src/modules/exercicios/screens/ExercicioForm';

const buildProps = ({ exercicioData = {}, isEdicao = false } = {}) => ({
  navigation: {
    goBack: jest.fn(),
    setOptions: jest.fn(),
    navigate: jest.fn(),
  },
  route: {
    params: { exercicioData, isEdicao },
  },
});

describe('ExercicioForm screen', () => {
  beforeEach(() => {
    mockSaveExercicio.mockClear();
    mockEditarExercicio.mockClear();
    mockThrowToastError.mockClear();
    mockThrowToastSuccess.mockClear();
  });

  it('renderiza sem crash no modo criar', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<ExercicioForm {...buildProps()} />);
    });
  });

  it('renderiza sem crash no modo editar com dados preenchidos', async () => {
    const props = buildProps({
      isEdicao: true,
      exercicioData: {
        id: 1,
        nome: 'Supino Reto',
        tipoExercicio: 'MUSCULACAO',
        grupoMuscularId: 1,
        descricao: 'Exercício de peito',
        possuiVariacao: false,
      },
    });
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<ExercicioForm {...props} />);
    });
  });

  it('configura header com título correto no modo criar', async () => {
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<ExercicioForm {...props} />);
    });

    const calls = props.navigation.setOptions.mock.calls;
    const lastOptions = calls[calls.length - 1][0];
    const headerNode = lastOptions.headerTitle();
    expect(JSON.stringify(headerNode)).toContain('Adicionar Exercício');
  });

  it('configura header com título correto no modo editar', async () => {
    const props = buildProps({ isEdicao: true, exercicioData: { id: 1 } });
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<ExercicioForm {...props} />);
    });

    const calls = props.navigation.setOptions.mock.calls;
    const lastOptions = calls[calls.length - 1][0];
    const headerNode = lastOptions.headerTitle();
    expect(JSON.stringify(headerNode)).toContain('Editar Exercício');
  });

  it('oculta botão nativo de voltar e centraliza título no header', async () => {
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<ExercicioForm {...props} />);
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
      instance = ReactTestRenderer.create(<ExercicioForm {...props} />);
    });

    const btnVoltar = instance.root.findByProps({ testID: 'btn-voltar' });
    await ReactTestRenderer.act(async () => {
      btnVoltar.props.onPress();
    });

    expect(props.navigation.goBack).toHaveBeenCalled();
  });

  it('exibe toast de erro ao salvar sem nome', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(
        <ExercicioForm
          {...buildProps({ exercicioData: { tipoExercicio: 'CALISTENIA' } })}
        />,
      );
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockThrowToastError).toHaveBeenCalledWith(
      'Todos os campos são obrigatórios!',
    );
    expect(mockSaveExercicio).not.toHaveBeenCalled();
  });

  it('exibe toast de erro ao salvar sem tipo de exercício', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(
        <ExercicioForm
          {...buildProps({ exercicioData: { nome: 'Supino' } })}
        />,
      );
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockThrowToastError).toHaveBeenCalledWith(
      'Todos os campos são obrigatórios!',
    );
    expect(mockSaveExercicio).not.toHaveBeenCalled();
  });

  it('exibe toast de erro ao salvar MUSCULACAO sem grupo muscular', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(
        <ExercicioForm
          {...buildProps({
            exercicioData: { nome: 'Supino', tipoExercicio: 'MUSCULACAO', grupoMuscularId: null },
          })}
        />,
      );
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockThrowToastError).toHaveBeenCalledWith(
      'Todos os campos são obrigatórios!',
    );
    expect(mockSaveExercicio).not.toHaveBeenCalled();
  });

  it('salva novo exercício com sucesso e navega de volta', async () => {
    let instance;
    const props = buildProps({
      exercicioData: {
        nome: 'Supino Reto',
        tipoExercicio: 'MUSCULACAO',
        grupoMuscularId: 1,
      },
    });
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ExercicioForm {...props} />);
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockSaveExercicio).toHaveBeenCalledWith(
      expect.objectContaining({ nome: 'Supino Reto', tipoExercicio: 'MUSCULACAO', grupoMuscularId: 1 }),
    );
    expect(mockThrowToastSuccess).toHaveBeenCalledWith('Exercicio salvo com sucesso!');
    expect(props.navigation.goBack).toHaveBeenCalled();
  });

  it('não exige grupo muscular ao salvar CALISTENIA', async () => {
    let instance;
    const props = buildProps({
      exercicioData: { nome: 'Barra fixa', tipoExercicio: 'CALISTENIA' },
    });
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ExercicioForm {...props} />);
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockSaveExercicio).toHaveBeenCalled();
    expect(mockThrowToastError).not.toHaveBeenCalled();
  });

  it('chama editarExercicio no modo edição', async () => {
    let instance;
    const props = buildProps({
      isEdicao: true,
      exercicioData: {
        id: 5,
        nome: 'Leg Press',
        tipoExercicio: 'MUSCULACAO',
        grupoMuscularId: 2,
      },
    });
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ExercicioForm {...props} />);
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockEditarExercicio).toHaveBeenCalledWith(5, expect.objectContaining({ nome: 'Leg Press' }));
    expect(mockSaveExercicio).not.toHaveBeenCalled();
    expect(mockThrowToastSuccess).toHaveBeenCalledWith('Exercicio salvo com sucesso!');
    expect(props.navigation.goBack).toHaveBeenCalled();
  });

  it('exibe campos condicionais para tipo MUSCULACAO', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(
        <ExercicioForm
          {...buildProps({ exercicioData: { tipoExercicio: 'MUSCULACAO' } })}
        />,
      );
    });

    expect(instance.root.findByProps({ testID: 'select-grupo-muscular' })).toBeTruthy();
    expect(instance.root.findByProps({ testID: 'checkbox-possui-variacao' })).toBeTruthy();
  });

  it('exibe campos condicionais para tipo CALISTENIA', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(
        <ExercicioForm
          {...buildProps({ exercicioData: { tipoExercicio: 'CALISTENIA' } })}
        />,
      );
    });

    expect(instance.root.findByProps({ testID: 'select-grupo-muscular' })).toBeTruthy();
    expect(instance.root.findByProps({ testID: 'checkbox-possui-variacao' })).toBeTruthy();
  });

  it('oculta campos condicionais para tipo AEROBICO', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(
        <ExercicioForm
          {...buildProps({ exercicioData: { tipoExercicio: 'AEROBICO' } })}
        />,
      );
    });

    expect(() =>
      instance.root.findByProps({ testID: 'select-grupo-muscular' }),
    ).toThrow();
    expect(() =>
      instance.root.findByProps({ testID: 'checkbox-possui-variacao' }),
    ).toThrow();
  });

  it('exibe toast de erro quando API falha ao salvar', async () => {
    mockSaveExercicio.mockRejectedValueOnce({
      response: { data: { message: 'Exercício já existe.' } },
    });

    let instance;
    const props = buildProps({
      exercicioData: { nome: 'Agachamento', tipoExercicio: 'CALISTENIA' },
    });
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<ExercicioForm {...props} />);
    });

    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => {
      await btnSalvar.props.onPress();
    });

    expect(mockThrowToastError).toHaveBeenCalledWith('Exercício já existe.');
    expect(props.navigation.goBack).not.toHaveBeenCalled();
  });
});
