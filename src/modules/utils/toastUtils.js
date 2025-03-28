import Toast from 'react-native-toast-message';

export const throwToastSuccess = (message) => {
  Toast.show({ type: 'success', text1: message });
};

export const throwToastError = (message) => {
  Toast.show({ type: 'error', text1: message });
};
