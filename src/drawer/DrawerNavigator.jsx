import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { useHeaderContext } from '../components/Header/HeaderProvider';
import SideBar from '../components/Sidebar/SideBar';
import { colors } from '../components/Styles/ComumStyles';
import UsuarioCadastroForm from '../modules/usuario/cadastro/screens/UsuarioCadastroForm';
import Perfil from '../modules/usuario/screens/Perfil';
import Navegacao from '../routes/Navegacao';
import DrawerHeaderTitle from './DrawerHeaderTitle';
import style from './style/style';

const Drawer = createDrawerNavigator();

const createScreenOptions = (title, subtitle) => ({
  headerTitle: () => <DrawerHeaderTitle title={title} subtitle={subtitle} />,
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
        options={createScreenOptions(
          activeTabOptions?.headerTitle,
          activeTabOptions?.headerSubtitle,
        )}
      />
      <Drawer.Screen
        name="UsuarioCadastroForm"
        component={UsuarioCadastroForm}
        options={createScreenOptions(
          'Cadastro de Admin',
          'Cadastre um novo Admin',
        )}
      />
      <Drawer.Screen
        name="Perfil"
        component={Perfil}
        options={createScreenOptions('Perfil', 'Gerencia suas informações')}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
