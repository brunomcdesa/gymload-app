import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  Title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  Botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  FormContainer: {
    padding: 20,
    flex: 1,
  },
  FormLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  FormTextInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  FormSelectInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f2f2f2',
    marginBottom: 15,
  },
});
