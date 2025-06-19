import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { memo, useContext, useState } from 'react';
import LoadingIndicator from '../components/Loading/LoadingIndicator';
import { AuthContext } from '../context/AuthProvider';
import { throwToastError } from '../modules/utils/toastUtils';

const ScreenWrapper = memo((props) => {
  const { Component, navigation, route } = props;
  const { isValidToken, logout } = useContext(AuthContext);
  const [isTokenValid, setIsTokenValid] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const checkToken = async () => {
        const isValid = await isValidToken();
        if (!isValid) {
          if (isActive) {
            throwToastError('Sessão expirada. Realize o login novamente.');
            setIsTokenValid(false);
            await logout();
          }
        } else {
          if (isActive) {
            setIsTokenValid(true);
          }
        }
      };

      checkToken();

      return () => {
        isActive = false;
      };
    }, [isValidToken, logout]),
  );

  if (!isTokenValid) {
    return <LoadingIndicator />;
  }

  return <Component navigation={navigation} route={route} />;
});

ScreenWrapper.displayName = 'ScreenWrapper';

ScreenWrapper.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  Component: PropTypes.elementType.isRequired,
};

export default ScreenWrapper;
