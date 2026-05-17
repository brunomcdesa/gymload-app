import { axiosPrivate } from '../../config/axios';
import { pMinDelay } from '../utils/promisse';

const urlBase = '/api/registro-atividades';

export const fetchDestaquesDeExercicios = (params, delay = 0) => {
  const exerciciosIds = params.join(',');

  const response = axiosPrivate.get(`${urlBase}/destaques`, {
    params: { exerciciosIds },
  });

  return pMinDelay(response, delay);
};

export const fetchRegistroAtividadeCompleto = ({
  exercicioId,
  variacaoId,
  delay = 0,
}) => {
  const response = axiosPrivate.get(`${urlBase}/${exercicioId}/completo`, {
    params: variacaoId != null ? { variacaoId } : undefined,
  });

  return pMinDelay(response, delay);
};

export const saveRegistroAtividade = (request, delay = 0) => {
  const response = axiosPrivate.post(urlBase, { ...request });

  return pMinDelay(response, delay);
};

export const editRegistroAtividade = (id, request, delay = 0) => {
  const response = axiosPrivate.put(`${urlBase}/${id}/editar`, { ...request });

  return pMinDelay(response, delay);
};

export const repetirUltimoRegistro = (exercicioId, delay = 0) => {
  const response = axiosPrivate.post(
    `${urlBase}/exercicio/${exercicioId}/repetir-ultimo-registro`,
  );

  return pMinDelay(response, delay);
};

export const repetirRegistro = ({ exercicioId, registroId }, delay = 0) => {
  const response = axiosPrivate.post(
    `${urlBase}/exercicio/${exercicioId}/repetir-registro/${registroId}`,
  );

  return pMinDelay(response, delay);
};

export const moverRegistros = (request, delay = 0) => {
  const response = axiosPrivate.patch(`${urlBase}/mover-variacao`, {
    ...request,
  });

  return pMinDelay(response, delay);
};
