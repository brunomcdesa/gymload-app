import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    Container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        flex: 1
    },
    CargaText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    FormContainer: {
        padding: 20,
        flex: 1
    },
    FormLabel: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    FormTextInput: {
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    FormSelectInput: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#f2f2f2",
        marginBottom: 15,
    }
});