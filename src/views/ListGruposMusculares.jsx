import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import * as Api from '../modules/gruposMusculares/Api';
import GrupoMuscular from '../modules/gruposMusculares/GrupoMuscular';
import style from './style/style';
import ComumStyles from '../comum/ComumStyles';
import AddButton from '../components/Button/AddButton';
import { useNavigation } from '@react-navigation/native';

const ListGruposMusculares = (props) => {
    const [gruposMusculares, setGruposMusculares] = useState([]);
    const navigation = useNavigation();

    const fetchGruposMusculares = async () => {
        try {
            const { data } = await Api.fetchGruposMusculares();
            setGruposMusculares(data);
        } catch (error) {
            console.error('Erro ao buscar grupos musculares:', error);
            return [];
        }
    }

    useEffect(() => {
        fetchGruposMusculares();
    }, [])

    const redirectGrupoMuscularForm = () => {
        navigation.navigate('GrupoMuscularForm');
    };

    return (
        <View style={style.ListContainer}>
            <Text style={ComumStyles.Title}>Grupos Musculares</Text>

            <FlatList 
                data={gruposMusculares}
                keyExtractor={(grupoMuscular) => grupoMuscular.id}
                renderItem={({ item: grupoMuscular }) => (
                <GrupoMuscular
                    id={grupoMuscular.id}
                    nome={grupoMuscular.value}
                />
            )}/>

            <View>
                <AddButton onPress={redirectGrupoMuscularForm}/>
            </View>
        </View>
    )
}

export default ListGruposMusculares;