import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Text, View } from 'react-native';
import style from './style/style';

const DrawerHeaderTitle = memo((props) => {
  const { title, subtitle } = props;
  const { headerTitleStyle, headerSubtitle, headerTextContainer } = style;

  return (
    <View style={headerTextContainer}>
      <Text style={headerTitleStyle}>{title || 'APP'}</Text>
      <Text style={headerSubtitle}>{subtitle}</Text>
    </View>
  );
});

DrawerHeaderTitle.displayName = 'DrawerHeaderTitle';

DrawerHeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default DrawerHeaderTitle;
