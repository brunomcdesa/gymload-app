import React from 'react';
import { Text, View } from 'react-native';
import AnuncioBanner from '../../../components/Anuncios/AnuncioBanner';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import {
  HEADER_SUBTITLE_DASHBOARD,
  HEADER_TITLE_DASHBOARD,
} from '../../../comum/constants';
import { useScreenTitle } from '../../../hooks/useScreenTitle';

const Dashboard = () => {
  const { container, subSubTitle } = ComumStyles;

  useScreenTitle(HEADER_TITLE_DASHBOARD, HEADER_SUBTITLE_DASHBOARD);

  return (
    <View style={container}>
      <Text style={subSubTitle}>Dashboard em desenvolvimento...</Text>
      <AnuncioBanner posicao="top" />
    </View>
  );
};

export default Dashboard;
