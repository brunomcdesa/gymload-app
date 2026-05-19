import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { AuthContext } from '../../src/context/AuthProvider';
import Exercicio from '../../src/modules/exercicios/components/Exercicio';

const authValue = { user: { sexo: 'MASCULINO' } };

const renderExercicio = (props) =>
  ReactTestRenderer.create(
    <AuthContext.Provider value={authValue}>
      <Exercicio {...props} />
    </AuthContext.Provider>,
  );

const baseExercicioData = {
  nome: 'Supino Reto',
  grupoMuscularNome: 'Peitoral',
};

const withDestaque = {
  destaque: '80kg',
  ultimaCarga: '75kg',
  ultimaDistancia: null,
};

const withDistancia = {
  destaque: '8km',
  ultimaCarga: null,
  ultimaDistancia: '8km',
};

const emptyHistorico = {
  destaque: null,
  ultimaCarga: null,
  ultimaDistancia: null,
};

describe('Exercicio component', () => {
  it('renders exercise name', () => {
    const instance = renderExercicio({
      exercicioData: baseExercicioData,
      dadosRegistrosAtividades: emptyHistorico,
      onViewHistorico: jest.fn(),
    });
    expect(JSON.stringify(instance.toJSON())).toContain('Supino Reto');
  });

  it('renders grupoMuscular when provided', () => {
    const instance = renderExercicio({
      exercicioData: baseExercicioData,
      dadosRegistrosAtividades: emptyHistorico,
      onViewHistorico: jest.fn(),
    });
    expect(JSON.stringify(instance.toJSON())).toContain('Peitoral');
  });

  it('does not render grupoMuscular when absent', () => {
    const instance = renderExercicio({
      exercicioData: { nome: 'Corrida' },
      dadosRegistrosAtividades: emptyHistorico,
      onViewHistorico: jest.fn(),
    });
    expect(JSON.stringify(instance.toJSON())).not.toContain('Peitoral');
  });

  it('renders RECORDE and ÚLTIMA CARGA labels when destaque is present', () => {
    const instance = renderExercicio({
      exercicioData: baseExercicioData,
      dadosRegistrosAtividades: withDestaque,
      onViewHistorico: jest.fn(),
    });
    const text = JSON.stringify(instance.toJSON());
    expect(text).toContain('RECORDE');
    expect(text).toContain('ÚLTIMA CARGA');
    expect(text).toContain('80kg');
    expect(text).toContain('75kg');
  });

  it('renders ÚLTIMA DISTÂNCIA label when only distancia is present', () => {
    const instance = renderExercicio({
      exercicioData: baseExercicioData,
      dadosRegistrosAtividades: withDistancia,
      onViewHistorico: jest.fn(),
    });
    expect(JSON.stringify(instance.toJSON())).toContain('ÚLTIMA DISTÂNCIA');
  });

  it('shows PR badge when there is a record', () => {
    const instance = renderExercicio({
      exercicioData: baseExercicioData,
      dadosRegistrosAtividades: withDestaque,
      onViewHistorico: jest.fn(),
    });
    expect(JSON.stringify(instance.toJSON())).toContain('PR');
  });

  it('does not show PR badge when destaque is empty', () => {
    const instance = renderExercicio({
      exercicioData: baseExercicioData,
      dadosRegistrosAtividades: emptyHistorico,
      onViewHistorico: jest.fn(),
    });
    expect(JSON.stringify(instance.toJSON())).not.toContain('"PR"');
  });

  it('renders without crashing when dadosRegistrosAtividades has null values', () => {
    expect(() =>
      renderExercicio({
        exercicioData: baseExercicioData,
        dadosRegistrosAtividades: emptyHistorico,
        onViewHistorico: jest.fn(),
      }),
    ).not.toThrow();
  });

  it('renders aggregated PR with variation names when exercise has variations and records', () => {
    const instance = renderExercicio({
      exercicioData: { ...baseExercicioData, possuiVariacao: true },
      dadosRegistrosAtividades: {
        destaque: '80kg',
        ultimaCarga: '70kg',
        ultimaDistancia: null,
        nomeVariacaoDestaque: 'Supino Inclinado',
        nomeVariacaoUltima: 'Supino Reto',
        qtdVariacoes: 3,
      },
      onViewHistorico: jest.fn(),
    });
    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('PR');
    expect(tree).toContain('RECORDE');
    expect(tree).toContain('80kg');
    expect(tree).toContain('70kg');
    expect(tree).toContain('Supino Inclinado');
    expect(tree).toContain('Supino Reto');
    expect(tree).toContain('3 variações');
  });

  it('shows singular "variação" label when qtdVariacoes is 1', () => {
    const instance = renderExercicio({
      exercicioData: { ...baseExercicioData, possuiVariacao: true },
      dadosRegistrosAtividades: {
        destaque: '50kg',
        ultimaCarga: '50kg',
        ultimaDistancia: null,
        nomeVariacaoDestaque: 'Reto',
        nomeVariacaoUltima: 'Reto',
        qtdVariacoes: 1,
      },
      onViewHistorico: jest.fn(),
    });
    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('1 variação');
    expect(tree).not.toContain('1 variações');
  });

  it('shows "Sem registros ainda" and chip without PR when variations exist but no records', () => {
    const instance = renderExercicio({
      exercicioData: { ...baseExercicioData, possuiVariacao: true },
      dadosRegistrosAtividades: {
        destaque: '-',
        ultimaCarga: null,
        ultimaDistancia: null,
        nomeVariacaoDestaque: null,
        nomeVariacaoUltima: null,
        qtdVariacoes: 2,
      },
      onViewHistorico: jest.fn(),
    });
    const tree = JSON.stringify(instance.toJSON());
    expect(tree).toContain('Sem registros ainda');
    expect(tree).toContain('2 variações');
    expect(tree).not.toContain('"PR"');
    expect(tree).not.toContain('RECORDE');
    expect(tree).not.toContain('ÚLTIMA CARGA');
  });
});
