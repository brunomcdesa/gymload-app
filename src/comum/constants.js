import { TestIds } from 'react-native-google-mobile-ads';

export const HEADER_TITLE_DASHBOARD = 'Dashboard';
export const HEADER_SUBTITLE_DASHBOARD = 'Seja bem vindo!';
export const HEADER_TITLE_EXERCICIOS = 'Exercícios';
export const HEADER_SUBTITLE_EXERCICIOS =
  'Veja todos os exercícios disponíveis';
export const HEADER_TITLE_TREINOS = 'Meus Treino';
export const HEADER_SUBTITLE_TREINOS = 'Gerencie seus treinos cadastrados';
export const HEADER_TITLE_GRUPOS_MUSCULARES = 'Grupos Musculares';
export const HEADER_SUBTITLE_GRUPOS_MUSCULARES =
  'Gerencie os Grupos musculares do sistema';

export const apiUrl = __DEV__
  ? 'https://gymload-api-dev.onrender.com'
  : 'https://gymload-api.onrender.com';

export const BANNER_ID = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-3977686093704418/1046387115';
