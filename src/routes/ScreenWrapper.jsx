import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { memo, useCallback } from 'react';

const ScreenWrapper = memo((props) => {
  const { headerTitle, headerSubtitle, onFocus, Component, navigation, route } =
    props;

  useFocusEffect(
    useCallback(() => {
      onFocus(headerTitle, headerSubtitle);
      return () => {};
    }, [headerTitle, headerSubtitle, onFocus]),
  );

  return <Component navigation={navigation} route={route} />;
});

ScreenWrapper.displayName = 'ScreenWrapper';

ScreenWrapper.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  headerTitle: PropTypes.string.isRequired,
  headerSubtitle: PropTypes.string.isRequired,
  onFocus: PropTypes.func.isRequired,
  Component: PropTypes.elementType.isRequired,
};

export default ScreenWrapper;
