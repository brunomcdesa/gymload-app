import { axiosPrivate, axiosPublic } from '../../config/axios';
import { fetchMakeRequestWithFile } from '../../config/fetch';
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

export const editarDadosUsuario = async (usuarioUuid, request, delay = 0) => {
  const formData = new FormData();
  formData.append('usuarioRequest', {
    string: JSON.stringify({
      nome: request.nome,
      username: request.username,
    }),
    type: 'application/json',
    name: 'usuarioRequest.json',
  });

  return await fetchMakeRequestWithFile(
    formData,
    `${usuarioUrl}/${usuarioUuid}/editar`,
    'PUT',
    delay,
  );
};
