import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
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
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
