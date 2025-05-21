import React from 'react';
import { View } from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
import { BANNER_ID } from '../../comum/constants';
import style from './styles/style';

const AnuncioBanner = () => {
  const { container, bottom } = style;
  const adUnitId = __DEV__ ? TestIds.BANNER : BANNER_ID;

  return (
    <View style={[container, bottom]}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => console.log('Anúncio carregado')}
        onAdFailedToLoad={(error) => console.warn('Falha no anúncio:', error)}
      />
    </View>
  );
};

export default AnuncioBanner;
