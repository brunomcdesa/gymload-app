import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import { AuthProvider } from './context/AuthProvider';
import MainNavigator from './routes/MainNavigator';

const App = () => (
  <AuthProvider>
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  </AuthProvider>
);

export default App;
