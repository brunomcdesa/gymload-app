import { useEffect, useRef } from 'react';
import {
  AdEventType,
  InterstitialAd,
} from 'react-native-google-mobile-ads';
import { INTERSTITIAL_ID } from '../../comum/constants';
import { useIsAdmin } from '../../modules/utils/userUtils';

let mostradoNestaSession = false;

const useAnuncioInterstitial = () => {
  const isAdmin = useIsAdmin();
  const adRef = useRef(null);
  const carregadoRef = useRef(false);

  useEffect(() => {
    if (isAdmin) return;

    const ad = InterstitialAd.createForAdRequest(INTERSTITIAL_ID, {
      requestNonPersonalizedAdsOnly: true,
    });
    adRef.current = ad;
    carregadoRef.current = false;

    const unsubscribe = ad.addAdEventListener(AdEventType.LOADED, () => {
      carregadoRef.current = true;
    });

    ad.load();

    return () => {
      unsubscribe();
    };
  }, [isAdmin]);

  const mostrar = () => {
    if (isAdmin || mostradoNestaSession || !carregadoRef.current) return;
    mostradoNestaSession = true;
    adRef.current?.show();
  };

  return { mostrar };
};

export default useAnuncioInterstitial;
