import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import style from './style/appHeaderStyle';

const AppHeader = (props) => {
  const { title, subtitle } = props;
  const { container, titleStyle, subtitleStyle } = style;
  const { top } = useSafeAreaInsets();

  return (
    <View style={[container, { paddingTop: top + 14 }]}>
      <Text style={titleStyle}>{title || 'APP'}</Text>
      {subtitle ? <Text style={subtitleStyle}>{subtitle}</Text> : null}
    </View>
  );
};

AppHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default AppHeader;
