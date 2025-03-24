import { axiosPublic } from '../../config/axios';
import { pMinDelay } from '../utils/promisse';

const authUrl = '/auth';

export const realizarLogin = (request, delay = 0) => {
  const response = axiosPublic.post(`${authUrl}/login`, { ...request });

  return pMinDelay(response, delay);
};
