import * as SecureStore from 'expo-secure-store';
import { apiUrl } from '../comum/constants';
import { pMinDelay } from '../modules/utils/promisse';

const fetchMakeRequestWithFile = async (formData, endpoint, method, delay) => {
  const token = await SecureStore.getItemAsync('userToken');
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  await tratarErroRequest(response);

  return pMinDelay(response, delay);
};

const fetchMakeRequestWithFilePublic = async (
  formData,
  endpoint,
  method,
  delay,
) => {
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: method,
    body: formData,
  });

  await tratarErroRequest(response);

  return pMinDelay(response, delay);
};

const tratarErroRequest = async (response) => {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = await response.text();
    }

    const error = new Error(
      `Erro na requisição: ${response.status} ${response.statusText}`,
    );
    error.data = errorData;
    error.status = response.status;
    throw error;
  }
};

export { fetchMakeRequestWithFile, fetchMakeRequestWithFilePublic };
