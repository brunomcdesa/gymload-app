import React, { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import style from './style/style';
import ComumStyles from '../../comum/ComumStyles';
import BackButton from '../../components/Button/BackButton';
import { Picker } from "@react-native-picker/picker";
import SaveButton from '../../components/Button/SaveButton';
import * as Api from './Api';

const UNIDADE_PESO = ["KG", "LBS"];

const CargaForm = ({ route, navigation }) => {
    const { Title, Botoes } = ComumStyles;
    const { FormContainer, FormLabel, FormTextInput, FormSelectInput} = style;
    const { exercicioId, exercicioNome } = route.params;
    const [formData, setFormData] = useState({
        exercicioId: exercicioId,
        carga: null,
        unidadePeso: UNIDADE_PESO[0],
        qtdRepeticoes: null,
    });

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = () => {
        if (!formData.carga || !formData.unidadePeso || !formData.qtdRepeticoes) {
            Alert.alert("Erro", "Todos os campos são obrigatórios!");
            return;
        }

        try {
            Api.saveNewHistoricoCarga(formData);
        } catch (error) {
            console.log('Erro ao salvar novo histórico de carga', error);
        }
        Alert.alert(
            "Sucesso",
            `Dados enviados:\nCarga: ${formData.carga}\nUnidade de Peso: ${formData.unidadePeso}\nQuantidade de Reoetições: ${formData.qtdRepeticoes}`
        );
    }

    return (
        <View style={FormContainer}>
            <Text style={Title}>Adicionar carga para: { exercicioNome }</Text>

            <Text style={FormLabel}>Carga:</Text>
            <TextInput style={FormTextInput}
                placeholder="Digite Carga"
                keyboardType="numeric"
                value={formData.carga}
                onChangeText={(cargaValue) => handleChange("carga", cargaValue)}
            />

            <Text style={FormLabel}>Unidade de Peso:</Text>
            <Picker style={FormSelectInput} 
                selectedValue={UNIDADE_PESO}
                onValueChange={(unidadePesoValue) => handleChange("unidadePeso", unidadePesoValue)}
            >
                {UNIDADE_PESO.map((item, index) => (
                    <Picker.Item key={index} label={item} value={item} />
                ))}
            </Picker>


            <Text style={FormLabel}>Quantidade de Repetições:</Text>
            <TextInput style={FormTextInput} 
                placeholder="Digite Quantidade de Repetições"
                keyboardType="numeric"
                value={formData.qtdRepeticoes}
                onChangeText={(qtdRepeticoesValue) => handleChange("qtdRepeticoes", qtdRepeticoesValue)}
            />

            <View style={Botoes}>
                <BackButton navigation={navigation}/>
                <SaveButton onPress={handleSubmit}/>
            </View>
        </View>
    )
};

export default CargaForm;