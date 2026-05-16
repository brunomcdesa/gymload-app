import { axiosPrivate, axiosPublic } from '../../config/axios';
import { pMinDelay } from '../utils/promisse';

const treinosUrl = '/api/treinos';

export const fetchTreinos = (
  buscarInativos,
  buscarImportados = false,
  delay = 0,
) => {
  const response = axiosPrivate.get(treinosUrl, {
    params: { buscarInativos, buscarImportados },
  });

  return pMinDelay(response, delay);
};

export const compartilharTreino = (id, delay = 0) => {
  return pMinDelay(
    axiosPrivate.post(`${treinosUrl}/${id}/compartilhar`),
    delay,
  );
};

export const fetchTreinoCompartilhado = (codigo, delay = 0) => {
  return pMinDelay(
    axiosPublic.get(`${treinosUrl}/compartilhado/${codigo}`),
    delay,
  );
};

export const importarTreino = (request, delay = 0) => {
  return pMinDelay(axiosPrivate.post(`${treinosUrl}/importar`, request), delay);
};

export const saveTreinos = (request, delay = 0) => {
  const response = axiosPrivate.post(treinosUrl, { ...request });

  return pMinDelay(response, delay);
};

export const editarTreinos = ({ id, request }, delay = 0) => {
  const response = axiosPrivate.put(`${treinosUrl}/${id}/editar`, {
    ...request,
  });

  return pMinDelay(response, delay);
};

export const inativarTreino = (id, delay = 0) => {
  const response = axiosPrivate.put(`${treinosUrl}/${id}/inativar`);

  return pMinDelay(response, delay);
};

export const ativarTreino = (id, delay = 0) => {
  const response = axiosPrivate.put(`${treinosUrl}/${id}/ativar`);

  return pMinDelay(response, delay);
};

export const finalizarTreino = (id, delay = 0) => {
  const response = axiosPrivate.post(`${treinosUrl}/${id}/finalizar`);

  return pMinDelay(response, delay);
};
