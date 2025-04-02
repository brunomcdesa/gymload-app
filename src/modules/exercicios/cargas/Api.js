import { axiosPrivate } from '../../../config/axios';
import { pMinDelay } from '../../utils/promisse';

const urlBase = '/api/historico-cargas';

export const fetchUltimoHistoricoCargas = ({ exercicioId, delay = 0 }) => {
  const response = axiosPrivate.get(`${urlBase}/${exercicioId}`);

  return pMinDelay(response, delay);
};

export const fetchHistoricoCargasCompleto = ({ exercicioId, delay = 0 }) => {
  const response = axiosPrivate.get(`${urlBase}/${exercicioId}/completo`);

  return pMinDelay(response, delay);
};

export const saveNewHistoricoCarga = (request, delay = 0) => {
  const response = axiosPrivate.post(urlBase, { ...request });

  return pMinDelay(response, delay);
};
