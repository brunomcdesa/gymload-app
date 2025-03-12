import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import style from './style';

export default props => (
    <SafeAreaView style={style.Header}>
        <Text style={style.HeaderText}>GymLoad</Text>
    </SafeAreaView>
)