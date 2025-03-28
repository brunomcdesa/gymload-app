import { axiosPrivate } from '../../config/axios';
import { pMinDelay } from '../utils/promisse';

const exerciciosUrl = '/api/exercicios';

export const fetchExercicios = async (delay = 0) => {
  const response = axiosPrivate.get(exerciciosUrl);

  return pMinDelay(response, delay);
};

export const saveExercicio = (request, delay = 0) => {
  const response = axiosPrivate.post(exerciciosUrl, { ...request });

  return pMinDelay(response, delay);
};
