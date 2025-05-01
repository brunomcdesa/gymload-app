import { axiosPrivate } from '../../config/axios';
import {
  fetchMakeRequestWithFile,
  fetchMakeRequestWithFilePublic,
} from '../../config/fetch';
import { pMinDelay } from '../utils/promisse';

const usuarioUrl = '/api/usuarios';

const getFormDataUsuarioRequest = (request) => {
  const formData = new FormData();
  formData.append('usuarioRequest', {
    string: JSON.stringify({
      nome: request.nome,
      username: request.username,
      password: request.password || null,
    }),
    type: 'application/json',
    name: 'usuarioRequest.json',
  });

  return formData;
};

export const cadastrarUsuarioAdmin = (request, delay = 0) => {
  const response = axiosPrivate.post(`${usuarioUrl}/cadastro/admin`, {
    ...request,
  });

  return pMinDelay(response, delay);
};

export const cadastrarUsuario = async (request, delay = 0) => {
  const formData = getFormDataUsuarioRequest(request);

  return await fetchMakeRequestWithFilePublic(
    formData,
    `${usuarioUrl}/cadastro`,
    'POST',
    delay,
  );
};

export const editarDadosUsuario = async (usuarioUuid, request, delay = 0) => {
  const formData = getFormDataUsuarioRequest(request);

  return await fetchMakeRequestWithFile(
    formData,
    `${usuarioUrl}/${usuarioUuid}/editar`,
    'PUT',
    delay,
  );
};
