import React from 'react';
import { View } from 'react-native';
import AppHeader from '../components/Header/AppHeader';
import { colors } from '../components/Styles/ComumStyles';
import { useHeaderContext } from '../context/HeaderProvider';
import Navegacao from './Navegacao';
import style from './styles/appShellStyle';

const AppShell = () => {
  const { activeTabOptions } = useHeaderContext();

  return (
    <View style={style.container}>
      <AppHeader
        title={activeTabOptions?.headerTitle}
        subtitle={activeTabOptions?.headerSubtitle}
      />
      <Navegacao />
    </View>
  );
};

AppShell.defaultBackground = colors.background;

export default AppShell;
