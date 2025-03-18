import { axiosPublic } from '../../config/axios';
import { pMinDelay } from '../utils/promisse';

export const fetchGruposMusculares = async (delay = 0) => {
  const response = axiosPublic.get('/api/grupos-musculares/select');

  return pMinDelay(response, delay);
};
