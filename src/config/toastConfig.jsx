import React from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import style from './style/style';

const { toastErrorStyle, toastSuccesStyle, toastTextStyle } = style;

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={toastSuccesStyle}
      text1Style={toastTextStyle}
      onPress={() => Toast.hide()}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={toastErrorStyle}
      text1Style={toastTextStyle}
      text1NumberOfLines={2}
      onPress={() => Toast.hide()}
    />
  ),
};
