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

  return pMinDelay(response, delay);
};

export { fetchMakeRequestWithFile };
