import { axiosPrivate, axiosPublic } from '../../config/axios';
import { pMinDelay } from '../utils/promisse';

const usuarioUrl = '/api/usuarios';
const authUrl = '/auth';
export const cadastrarUsuarioAdmin = (request, delay = 0) => {
  const response = axiosPrivate.post(`${usuarioUrl}/cadastro/admin`, {
    ...request,
  });

  return pMinDelay(response, delay);
};

export const cadastrarUsuario = (request, delay = 0) => {
  const response = axiosPublic.post(`${authUrl}/cadastro`, {
    ...request,
  });

  return pMinDelay(response, delay);
};
