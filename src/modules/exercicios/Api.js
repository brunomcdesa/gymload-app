import { axiosPrivate } from '../../config/axios';
import { pMinDelay } from '../utils/promisse';

const exerciciosUrl = '/api/exercicios';
const exerciciosVariacoesUrl = '/api/exercicios-variacoes';

export const fetchExercicios = (filtros, delay = 0) => {
  const response = axiosPrivate.get(exerciciosUrl, { params: filtros });

  return pMinDelay(response, delay);
};

export const saveExercicio = (request, delay = 0) => {
  const response = axiosPrivate.post(exerciciosUrl, { ...request });

  return pMinDelay(response, delay);
};

export const fetchExerciciosSelect = (delay = 0) => {
  const response = axiosPrivate.get(`${exerciciosUrl}/select`);

  return pMinDelay(response, delay);
};

export const fetchExerciciosDoTreino = (treinoId, delay = 0) => {
  const response = axiosPrivate.get(`${exerciciosUrl}/treino/${treinoId}`);

  return pMinDelay(response, delay);
};

export const editarExercicio = (exercicioId, request, delay = 0) => {
  const response = axiosPrivate.put(`${exerciciosUrl}/${exercicioId}/editar`, {
    ...request,
  });

  return pMinDelay(response, delay);
};

export const saveExercicioVariacao = (request, delay) => {
  const response = axiosPrivate.post(`${exerciciosVariacoesUrl}`, {
    ...request,
  });

  return pMinDelay(response, delay);
};
