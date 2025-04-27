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
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 5,
    textAlign: 'center',
  },
  subSubTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
    textAlign: 'center',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  formContainer: {
    padding: 20,
    flex: 1,
    backgroundColor: colors.background,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: '3%',
    color: '#fff',
  },
  formTextInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: '2%',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  formSelectInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f2f2f2',
    marginBottom: 15,
  },
  elementContainer: {
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
  formLabelObrigatorio: {
    flexDirection: 'row',
  },
  asteriscoObrigatorio: {
    color: '#ff5555',
    marginLeft: 2,
    marginTop: '3%',
  },
  actionSheetTitle: {
    color: colors.textLight,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  actionSheetMessage: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  actionSheetButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#383838',
  },
  actionSheetButtonText: {
    color: colors.textLight,
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 12,
  },
  actionSheetCancelButton: {
    padding: 15,
    marginTop: 10,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#383838',
  },
  actionSheetCancelButtonText: {
    color: colors.secondary,
    fontWeight: '600',
  },
  actionSheetContainer: {
    backgroundColor: '#2a2a2a',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#383838',
  },
  actionSheetDestructiveButtonText: {
    color: colors.danger,
    fontWeight: '600',
  },
});

export { colors, ComumStyles };
