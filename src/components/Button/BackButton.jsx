import React from 'react';
import { Button, View } from 'react-native';

export default ({ navigation }) => {
    return (
        <View>
            <Button
                title="Voltar"
                onPress={() => {
                navigation.goBack();
                }}
            />
        </View>
    )
}