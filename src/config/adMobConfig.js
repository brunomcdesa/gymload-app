import * as AdMob from 'expo-ads-admob';

const ADMOB_APP_ID = 'ca-app-pub-3977686093704418~7718286453';
const BANNER_ID = 'ca-app-pub-3977686093704418/1046387115';

const initAdMob = async () => {
  try {
    if (!AdMob) {
      console.error(
        'Módulo AdMob não encontrado ou métodos necessários não disponíveis',
      );
      return false;
    }

    await AdMob.initializeAsync({
      requestTrackingPermission: true,
      appId: ADMOB_APP_ID,
    });

    console.log('AdMob inicializado com sucesso');
  } catch (error) {
    console.error('Falha ao inicializar AdMob:', error);
  }
};

export default {
  ADMOB_APP_ID,
  BANNER_ID,
  initAdMob,
};
