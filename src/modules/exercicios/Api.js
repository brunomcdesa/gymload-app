import { axiosPrivate } from '../../config/axios';
import { pMinDelay } from '../utils/promisse';

const exerciciosUrl = '/api/exercicios';

export const fetchExercicios = (delay = 0) => {
  const response = axiosPrivate.get(exerciciosUrl);

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
