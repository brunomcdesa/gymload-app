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
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
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
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    margin: 10,
    shadowColor: '#ff5555',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#383838',
  },
  passwordContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
});

export { colors, ComumStyles };
