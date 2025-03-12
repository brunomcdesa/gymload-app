import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    Exercicio: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    ExercicioContainer: {
        flexDirection: 'column',
    },
    ExercicioText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    }
}); 