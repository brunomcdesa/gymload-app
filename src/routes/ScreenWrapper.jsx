import PropTypes from 'prop-types';
import React, { memo, useContext, useEffect, useState } from 'react';
import LoadingIndicator from '../components/Loading/LoadingIndicator';
import { AuthContext } from '../context/AuthProvider';
import { throwToastError } from '../modules/utils/toastUtils';

const ScreenWrapper = memo((props) => {
  const { headerTitle, headerSubtitle, onFocus, Component, navigation, route } =
    props;
  const { isValidToken, logout } = useContext(AuthContext);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const isValid = await isValidToken();
      if (!isValid) {
        throwToastError('Token inválido. Realize o login novamente');
        await logout();
        setShouldRender(false);
      } else {
        onFocus(headerTitle, headerSubtitle);
        setShouldRender(true);
      }
    };

    checkToken();
  }, [isValidToken, onFocus, logout, headerTitle, headerSubtitle]);

  if (!shouldRender) {
    return <LoadingIndicator />;
  }

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
