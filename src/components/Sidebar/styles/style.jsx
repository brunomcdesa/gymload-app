import { StyleSheet } from 'react-native';
import { colors } from '../../Styles/ComumStyles';

export default StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 60,
  },
  logoutButton: {
    backgroundColor: '#ff5666',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignSelf: 'center',
    width: '80%',
  },
  buttonCadastroAdmin: {
    backgroundColor: '#A1F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignSelf: 'center',
    width: '80%',
  },
  logoutButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footer: {
    paddingBottom: 20,
  },
  button: {
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#c13e3e',
  },
  buttonText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  buttonsContainer: {
    marginTop: '10%',
  },
});
