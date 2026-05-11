import PropTypes from 'prop-types';
import React from 'react';
import { Platform, StatusBar, Text, View } from 'react-native';
import style from './style/appHeaderStyle';

const AppHeader = (props) => {
  const { title, subtitle } = props;
  const { container, titleStyle, subtitleStyle } = style;

  return (
    <View style={container}>
      <Text style={titleStyle}>{title || 'APP'}</Text>
      {subtitle ? <Text style={subtitleStyle}>{subtitle}</Text> : null}
    </View>
  );
};

AppHeader.statusBarHeight =
  Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0;

AppHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default AppHeader;
