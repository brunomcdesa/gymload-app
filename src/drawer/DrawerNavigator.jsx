import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { useHeaderContext } from '../components/Header/HeaderProvider';
import SideBar from '../components/Header/sidebar/SideBar';
import { colors } from '../components/Styles/ComumStyles';
import UsuarioCadastroForm from '../modules/usuario/cadastro/screens/UsuarioCadastroForm';
import Navegacao from '../routes/Navegacao';
import style from './style/style';

const Drawer = createDrawerNavigator();

const DrawerHeaderTitle = memo(({ title, subtitle }) => {
  const { headerTitleStyle, headerSubtitle, headerTextContainer } = style;
  return (
    <View style={headerTextContainer}>
      <Text style={headerTitleStyle}>{title || 'APP'}</Text>
      <Text style={headerSubtitle}>{subtitle}</Text>
    </View>
  );
});

const DrawerNavigator = () => {
  const { headerContainer } = style;
  const { activeTabOptions } = useHeaderContext();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <SideBar {...props} />}
      screenOptions={{
        swipeEnabled: true,
        headerStyle: headerContainer,
        headerTintColor: colors.textLight,
        headerTitleAlign: 'center',
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerRightContainerStyle: { paddingLeft: 16 },
      }}
    >
      <Drawer.Screen
        name="App"
        component={Navegacao}
        options={{
          headerTitle: () => (
            <DrawerHeaderTitle
              title={activeTabOptions?.headerTitle}
              subtitle={activeTabOptions?.headerSubtitle}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="UsuarioCadastroForm"
        component={UsuarioCadastroForm}
        options={{
          headerTitle: () => (
            <DrawerHeaderTitle
              title="Cadastro de Admin"
              subtitle="Cadastre um novo Admin"
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
