import React from 'react';
import { Text, View } from 'react-native';
import style from './style/style';
import ComumStyles from '../comum/ComumStyles';


export default props => (
    <View style={style.Container}>
        <Text style={ComumStyles.Title}>Seja Bem Vindo!</Text>
    </View>
)