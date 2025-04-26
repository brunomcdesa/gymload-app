import { axiosPrivate } from '../config/axios';
import { pMinDelay } from '../modules/utils/promisse';

const enumUrl = '/api/enums';

export const fetchTiposExerciciosSelect = (delay = 0) => {
  const response = axiosPrivate.get(`${enumUrl}/tipos-exercicios/select`);

  return pMinDelay(response, delay);
};

export const fetchTiposPegadasSelect = (delay = 0) => {
  const response = axiosPrivate.get(`${enumUrl}/tipos-pegadas/select`);

  return pMinDelay(response, delay);
};

export const fetchUnidadesPesosSelect = (delay = 0) => {
  const response = axiosPrivate.get(`${enumUrl}/unidades-pesos/select`);

  return pMinDelay(response, delay);
};

export const fetchTiposEquipamentosSelect = (delay = 0) => {
  const response = axiosPrivate.get(`${enumUrl}/tipos-equipamentos/select`);

  return pMinDelay(response, delay);
};
