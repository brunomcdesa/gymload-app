import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from '../modules/login/Login';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);

export default AuthStack;
