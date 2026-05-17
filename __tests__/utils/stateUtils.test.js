import { handleChangeState } from '../../src/modules/utils/stateUtils';

describe('handleChangeState', () => {
  it('updates the specified field while keeping others unchanged', () => {
    const setState = jest.fn();
    const state = { nome: 'Bruno', idade: 25 };
    handleChangeState(setState, state, 'nome', 'Carlos');
    expect(setState).toHaveBeenCalledWith({ nome: 'Carlos', idade: 25 });
  });

  it('adds a new field to an existing state object', () => {
    const setState = jest.fn();
    const state = { nome: 'Bruno' };
    handleChangeState(setState, state, 'email', 'bruno@test.com');
    expect(setState).toHaveBeenCalledWith({
      nome: 'Bruno',
      email: 'bruno@test.com',
    });
  });

  it('calls setState exactly once', () => {
    const setState = jest.fn();
    handleChangeState(setState, { a: 1 }, 'a', 2);
    expect(setState).toHaveBeenCalledTimes(1);
  });

  it('does not mutate the original state object', () => {
    const setState = jest.fn();
    const state = { nome: 'Bruno' };
    handleChangeState(setState, state, 'nome', 'Carlos');
    expect(state.nome).toBe('Bruno');
    const called = setState.mock.calls[0][0];
    expect(called).not.toBe(state);
  });

  it('handles null values correctly', () => {
    const setState = jest.fn();
    handleChangeState(setState, { peso: '80' }, 'peso', null);
    expect(setState).toHaveBeenCalledWith({ peso: null });
  });

  it('handles numeric values as strings', () => {
    const setState = jest.fn();
    handleChangeState(setState, { qtdSeries: '3' }, 'qtdSeries', '4');
    expect(setState).toHaveBeenCalledWith({ qtdSeries: '4' });
  });
});
