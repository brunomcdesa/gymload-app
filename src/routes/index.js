import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import Tab from './TabNavigator';

export default props => (
    <View style={{ flex: 1 }}>
        <NavigationContainer>
            <Tab />
        </NavigationContainer>
    </View>
)