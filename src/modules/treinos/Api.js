import { axiosPrivate } from '../../config/axios';
import { pMinDelay } from '../utils/promisse';

const treinosUrl = '/api/treinos';

export const fetchTreinos = (delay = 0) => {
  const response = axiosPrivate.get(treinosUrl);

  return pMinDelay(response, delay);
};

export const saveTreinos = (request, delay = 0) => {
  const response = axiosPrivate.post(treinosUrl, { ...request });

  return pMinDelay(response, delay);
};
