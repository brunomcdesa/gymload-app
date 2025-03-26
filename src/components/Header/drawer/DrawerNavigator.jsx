import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import UsuarioCadastroForm from '../../../modules/usuario/cadastro/UsuarioCadastroForm';
import Navegacao from '../../../routes/Navegacao';
import Header from '../Header';
import SideBar from '../sidebar/SideBar';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <SideBar {...props} />}
      screenOptions={{
        header: ({ navigation }) => <Header navigation={navigation} />,
        swipeEnabled: true,
      }}
    >
      <Drawer.Screen name="App" component={Navegacao} />
      <Drawer.Screen
        name="UsuarioCadastroForm"
        component={UsuarioCadastroForm}
        options={{
          headerTitle: 'Cadastro de Usuário Admin',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
