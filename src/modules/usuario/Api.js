import { axiosPrivate } from '../../config/axios';
import { pMinDelay } from '../utils/promisse';

const usuarioUrl = '/api/usuarios';

export const cadastrarUsuarioAdmin = (request, delay = 0) => {
  const response = axiosPrivate.post(`${usuarioUrl}/cadastro/admin`, {
    ...request,
  });

  return pMinDelay(response, delay);
};
