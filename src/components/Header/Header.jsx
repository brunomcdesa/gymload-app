import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import style from './style/style';

const Header = (props) => {
  const { HeaderStyle, MenuButton, MenuIcon, HeaderText } = style;
  const navigation = props.navigation;

  return (
    <SafeAreaView style={HeaderStyle}>
      <TouchableOpacity
        onPress={() => navigation?.openDrawer()}
        style={MenuButton}
      >
        <Text style={MenuIcon}>☰</Text>
      </TouchableOpacity>

      <Text style={HeaderText}>GymLoad</Text>
    </SafeAreaView>
  );
};

export default Header;
