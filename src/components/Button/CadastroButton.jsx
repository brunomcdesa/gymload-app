import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import style from './style/style';

const CadastroButton = (props) => {
    const {CadastroButtonStyle} = style;
    return (
        <TouchableOpacity
        style={CadastroButtonStyle}
        onPress={() => props.navigation.navigate('Cadastro')}
      >
        <Text style={{ color: colors.buttonText, fontWeight: 'bold' }}>Realizar Cadastro</Text>
      </TouchableOpacity>
    )
}

export default CadastroButton;