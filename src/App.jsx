import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { NavigationContainer } from '@react-navigation/native';
import 'expo-dev-client';
import React from 'react';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { toastConfig } from './config/toastConfig';
import { AuthProvider } from './context/AuthProvider';
import MainNavigator from './routes/MainNavigator';

const App = () => (
  <AuthProvider>
    <ActionSheetProvider>
      <NavigationContainer>
        <MainNavigator />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </ActionSheetProvider>
  </AuthProvider>
);

export default App;
