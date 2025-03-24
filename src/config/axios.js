import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const axiosPublic = axios.create({
  baseURL: 'https://gymload-api.onrender.com',
});

const axiosPrivate = axios.create({
  baseURL: 'https://gymload-api.onrender.com',
});

axiosPrivate.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync('userToken');
    const newConfig = { ...config };

    newConfig.headers.Authorization = `Bearer ${token}`;

    return newConfig;
  } catch (error) {
    return config;
  }
});

export { axiosPrivate, axiosPublic };
