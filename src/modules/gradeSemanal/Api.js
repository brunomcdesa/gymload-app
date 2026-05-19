import { axiosPrivate } from '../../config/axios';
import { pMinDelay } from '../utils/promisse';

const gradeSemanalUrl = '/api/grade-semanal';

export const fetchGradeSemanal = (delay = 0) =>
  pMinDelay(axiosPrivate.get(gradeSemanalUrl), delay);

export const fetchTreinoHoje = (delay = 0) =>
  pMinDelay(axiosPrivate.get(`${gradeSemanalUrl}/hoje`), delay);

export const salvarDia = (diaSemana, treinoId, delay = 0) =>
  pMinDelay(
    axiosPrivate.put(`${gradeSemanalUrl}/${diaSemana}`, { treinoId }),
    delay,
  );

export const removerDia = (diaSemana, delay = 0) =>
  pMinDelay(axiosPrivate.delete(`${gradeSemanalUrl}/${diaSemana}`), delay);
