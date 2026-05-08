import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import Exercicio from '../../src/modules/exercicios/components/Exercicio';

const baseExercicioData = {
  nome: 'Supino Reto',
  grupoMuscular: 'Peitoral',
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
    const instance = ReactTestRenderer.create(
      <Exercicio
        exercicioData={baseExercicioData}
        dadosRegistrosAtividades={emptyHistorico}
      />,
    );
    const json = instance.toJSON();
    expect(JSON.stringify(json)).toContain('Supino Reto');
  });

  it('renders grupoMuscular when provided', () => {
    const instance = ReactTestRenderer.create(
      <Exercicio
        exercicioData={baseExercicioData}
        dadosRegistrosAtividades={emptyHistorico}
      />,
    );
    expect(JSON.stringify(instance.toJSON())).toContain('Peitoral');
  });

  it('does not render grupoMuscular when absent', () => {
    const instance = ReactTestRenderer.create(
      <Exercicio
        exercicioData={{ nome: 'Corrida' }}
        dadosRegistrosAtividades={emptyHistorico}
      />,
    );
    expect(JSON.stringify(instance.toJSON())).not.toContain('Peitoral');
  });

  it('renders RECORDE and ÚLTIMA CARGA labels when destaque is present', () => {
    const instance = ReactTestRenderer.create(
      <Exercicio
        exercicioData={baseExercicioData}
        dadosRegistrosAtividades={withDestaque}
      />,
    );
    const text = JSON.stringify(instance.toJSON());
    expect(text).toContain('RECORDE');
    expect(text).toContain('ÚLTIMA CARGA');
    expect(text).toContain('80kg');
    expect(text).toContain('75kg');
  });

  it('renders ÚLTIMA DISTÂNCIA label when only distancia is present', () => {
    const instance = ReactTestRenderer.create(
      <Exercicio
        exercicioData={baseExercicioData}
        dadosRegistrosAtividades={withDistancia}
      />,
    );
    expect(JSON.stringify(instance.toJSON())).toContain('ÚLTIMA DISTÂNCIA');
  });

  it('shows PR badge when there is a record', () => {
    const instance = ReactTestRenderer.create(
      <Exercicio
        exercicioData={baseExercicioData}
        dadosRegistrosAtividades={withDestaque}
      />,
    );
    expect(JSON.stringify(instance.toJSON())).toContain('PR');
  });

  it('does not show PR badge when destaque is empty', () => {
    const instance = ReactTestRenderer.create(
      <Exercicio
        exercicioData={baseExercicioData}
        dadosRegistrosAtividades={emptyHistorico}
      />,
    );
    expect(JSON.stringify(instance.toJSON())).not.toContain('"PR"');
  });

  it('renders without crashing when dadosRegistrosAtividades has null values', () => {
    expect(() => {
      ReactTestRenderer.create(
        <Exercicio
          exercicioData={baseExercicioData}
          dadosRegistrosAtividades={emptyHistorico}
        />,
      );
    }).not.toThrow();
  });
});
