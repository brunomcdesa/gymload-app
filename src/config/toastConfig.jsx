import React from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import style from './style/style';

const { ToastErrorStyle, ToastSuccesStyle, ToastTextStyle } = style;

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={ToastSuccesStyle}
      text1Style={ToastTextStyle}
      onPress={() => Toast.hide()}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={ToastErrorStyle}
      text1Style={ToastTextStyle}
      onPress={() => Toast.hide()}
    />
  ),
};
