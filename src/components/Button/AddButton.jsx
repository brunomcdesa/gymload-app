import React from 'react';
import { Button, View } from 'react-native';
import style from './style/style';

export default props => {
    return (
        <View style={style.AddButton}>
            <Button title='Adicionar' onPress={props.onPress}/>
        </View>
    )
}