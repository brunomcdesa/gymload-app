import { axiosPublic } from '../../config/axios';
import { pMinDelay } from '../utils/promisse';

const apiUrl = '/api/grupos-musculares';

export const saveGrupoMuscular = (request, delay = 0) => {
  const response = axiosPublic.post(`${apiUrl}`, { ...request });

  return pMinDelay(response, delay);
};

export const fetchGruposMusculares = async (delay = 0) => {
  const response = axiosPublic.get(`${apiUrl}/select`);

  return pMinDelay(response, delay);
};
