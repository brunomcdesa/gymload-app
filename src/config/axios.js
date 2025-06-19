import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { apiUrl } from '../comum/constants';

const axiosPublic = axios.create({
  baseURL: apiUrl,
});

const axiosPrivate = axios.create({
  baseURL: apiUrl,
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
