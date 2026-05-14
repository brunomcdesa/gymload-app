import { axiosPrivate } from '../../config/axios';
import { pMinDelay } from '../utils/promisse';

const dashboardUrl = '/api/dashboard';

export const fetchDashboardStats = (delay = 0) => {
  const response = axiosPrivate.get(`${dashboardUrl}/stats`);
  return pMinDelay(response, delay);
};
