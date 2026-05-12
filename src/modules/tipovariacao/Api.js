import { axiosPrivate } from '../../config/axios';
import { pMinDelay } from '../utils/promisse';

const urlBase = '/api/tipos-variacoes';

export const fetchTiposVariacoes = (delay = 0) => {
  const response = axiosPrivate.get(urlBase);
  return pMinDelay(response, delay);
};

export const fetchTiposVariacoesSelect = (delay = 0) => {
  const response = axiosPrivate.get(`${urlBase}/select`);
  return pMinDelay(response, delay);
};

export const saveTipoVariacao = (request, delay = 0) => {
  const response = axiosPrivate.post(urlBase, { ...request });
  return pMinDelay(response, delay);
};

export const editarTipoVariacao = (id, request, delay = 0) => {
  const response = axiosPrivate.put(`${urlBase}/${id}/editar`, { ...request });
  return pMinDelay(response, delay);
};
