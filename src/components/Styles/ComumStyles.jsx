import { StyleSheet } from 'react-native';

const colors = {
  primary: '#333',
  secondary: '#ff5555',
  background: '#222',
  inputBackground: '#2a2a2a',
  inputBorder: '#383838',
  inputText: '#fff',
  placeholderText: '#aaa',
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
    fontSize: 18,
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
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  formContainer: {
    padding: 20,
    paddingBottom: 20,
    flex: 1,
    backgroundColor: colors.background,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 12,
    color: colors.textLight,
  },
  formSelectInput: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    backgroundColor: colors.inputBackground,
    marginBottom: 16,
  },
  formLabelObrigatorio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  asteriscoObrigatorio: {
    color: colors.secondary,
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
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
  inputGroup: {
    flex: 1,
    marginRight: 10,
  },
  lastInputGroup: {
    flex: 1,
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  headerForm: {
    alignItems: 'center',
  },
  subTitleForm: {
    color: '#aaa',
    marginBottom: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoName: {
    paddingLeft: 15,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export { colors, ComumStyles };
