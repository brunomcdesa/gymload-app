import { axiosPrivate } from '../../config/axios';
import { pMinDelay } from '../utils/promisse';

const apiUrl = '/api/grupos-musculares';

export const saveGrupoMuscular = (request, delay = 0) => {
  const response = axiosPrivate.post(`${apiUrl}`, { ...request });

  return pMinDelay(response, delay);
};

export const fetchGruposMusculares = (delay = 0) => {
  const response = axiosPrivate.get(`${apiUrl}`);

  return pMinDelay(response, delay);
};

export const fetchGruposMuscularesSelect = (delay = 0) => {
  const response = axiosPrivate.get(`${apiUrl}/select`);

  return pMinDelay(response, delay);
};
