import { axiosPublic } from '../../config/axios';
import { pMinDelay } from '../utils/promisse';

const urlBase = '/api/historico-cargas';

export const fetchHistoricoCargas = ({ exercicioId, delay = 0 }) => {
  const response = axiosPublic.get(`${urlBase}/${exercicioId}`);

  return pMinDelay(response, delay);
};

export const saveNewHistoricoCarga = (request, delay = 0) => {
  const response = axiosPublic.post(urlBase, { ...request });

  return pMinDelay(response, delay);
};
