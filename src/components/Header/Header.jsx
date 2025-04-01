import PropTypes from 'prop-types';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
        <MaterialIcons name="menu" style={MenuIcon} />
      </TouchableOpacity>

      <Text style={HeaderText}>GymLoad</Text>
    </SafeAreaView>
  );
};

Header.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
};

export default Header;
