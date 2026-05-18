import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { NavigationContainer } from '@react-navigation/native';
import 'expo-dev-client';
import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { ComumStyles } from './components/Styles/ComumStyles';
import { toastConfig } from './config/toastConfig';
import { AuthProvider } from './context/AuthProvider';
import { HeaderProvider } from './context/HeaderProvider';
import MainNavigator from './routes/MainNavigator';

const App = () => (
  <GestureHandlerRootView style={ComumStyles.flexOne}>
    <SafeAreaProvider>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <AuthProvider>
        <HeaderProvider>
          <ActionSheetProvider>
            <NavigationContainer>
              <MainNavigator />
              <Toast config={toastConfig} />
            </NavigationContainer>
          </ActionSheetProvider>
        </HeaderProvider>
      </AuthProvider>
    </SafeAreaProvider>
  </GestureHandlerRootView>
);

export default App;
