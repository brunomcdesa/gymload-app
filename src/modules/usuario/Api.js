import { axiosPrivate } from '../../config/axios';
import {
  fetchMakeRequestWithFile,
  fetchMakeRequestWithFilePublic,
} from '../../config/fetch';
import { pMinDelay } from '../utils/promisse';

const usuarioUrl = '/api/usuarios';

const getFormDataUsuarioRequest = (request, uriImagemPerfil) => {
  const formData = new FormData();
  formData.append('usuarioRequest', {
    string: JSON.stringify({
      nome: request.nome,
      email: request.email,
      username: request.username,
      password: request.password || null,
    }),
    type: 'application/json',
    name: 'usuarioRequest.json',
  });

  if (uriImagemPerfil) {
    formData.append('imagem', {
      uri: uriImagemPerfil,
      name: 'imagem.jpg',
      type: 'image/jpeg',
    });
  }

  return formData;
};

export const cadastrarUsuarioAdmin = (request, delay = 0) => {
  const response = axiosPrivate.post(`${usuarioUrl}/cadastro/admin`, {
    ...request,
  });

  return pMinDelay(response, delay);
};

export const cadastrarUsuario = async (
  request,
  uriImagemPerfil = null,
  delay = 0,
) => {
  const formData = getFormDataUsuarioRequest(request, uriImagemPerfil);

  return await fetchMakeRequestWithFilePublic(
    formData,
    `${usuarioUrl}/cadastro`,
    'POST',
    delay,
  );
};

export const editarDadosUsuario = async (
  usuarioUuid,
  request,
  uriImagemPerfil = null,
  delay = 0,
) => {
  const formData = getFormDataUsuarioRequest(request, uriImagemPerfil);

  return await fetchMakeRequestWithFile(
    formData,
    `${usuarioUrl}/${usuarioUuid}/editar`,
    'PUT',
    delay,
  );
};

export const fetchUrlImagemPerfil = (delay = 0) => {
  const response = axiosPrivate.get(`${usuarioUrl}/url-imagem-perfil`);

  return pMinDelay(response, delay);
};

export const fetchDadosUsuarioLogado = (delay = 0) => {
  const response = axiosPrivate.get(`${usuarioUrl}/detalhar`);

  return pMinDelay(response, delay);
};
