import { StyleSheet } from 'react-native';

const colors = {
  primary: '#333',
  secondary: '#ff5555',
  background: '#222',
  danger: '#dc3545',
  success: '#28a745',
  textLight: '#FFF',
  textDark: '#333',
  buttonText: '#fff',
};

const ComumStyles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  Title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 5,
  },
  SubTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 5,
    textAlign: 'center',
  },
  SubSubTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
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
    backgroundColor: colors.background,
  },
  FormLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: '3%',
    color: '#fff',
  },
  FormTextInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: '2%',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  FormSelectInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f2f2f2',
    marginBottom: 15,
  },
  ElementContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  passwordContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
});

export { colors, ComumStyles };
