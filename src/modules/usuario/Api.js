import { axiosPrivate, axiosPublic } from '../../config/axios';
import { pMinDelay } from '../utils/promisse';

const usuarioUrl = '/api/usuarios';

export const cadastrarUsuarioAdmin = (request, delay = 0) => {
  const response = axiosPrivate.post(`${usuarioUrl}/cadastro/admin`, {
    ...request,
  });

  return pMinDelay(response, delay);
};

export const cadastrarUsuario = (request, delay = 0) => {
  const response = axiosPublic.post(`${usuarioUrl}/cadastro`, {
    ...request,
  });

  return pMinDelay(response, delay);
};
