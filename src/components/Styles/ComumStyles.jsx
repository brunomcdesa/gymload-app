import { StyleSheet } from 'react-native';

const colors = {
  primary: '#333',
  secondary: '#ff5555',
  terciary: '#AAA',
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
  borderSubtle: '#3a3a3a',
  textMuted: '#e8e8e8',
  textHint: '#666',
  disabled: '#555',
  black: '#000',
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
  scrollContentContainer: {
    padding: '2%',
    paddingBottom: 120,
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
    backgroundColor: colors.inputBackground,
    borderRadius: 16,
    margin: 10,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.inputBorder,
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
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoName: {
    paddingLeft: 15,
    color: colors.textLight,
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  fabContainer: {
    position: 'absolute',
    right: 24,
    bottom: 24,
  },
  // Layout helpers
  flexOne: {
    flex: 1,
  },
  flexShrinkZero: {
    flexShrink: 0,
  },
  flexGrowOne: {
    flexGrow: 1,
  },
  // Form footer (botão de Voltar + Salvar/Adicionar no rodapé)
  screenFooter: {
    flexDirection: 'row',
    gap: 10,
    padding: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: colors.primary,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '700',
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.success,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonDisabled: {
    backgroundColor: colors.disabled,
  },
  saveButtonIcon: {
    lineHeight: 18,
  },
  saveButtonText: {
    color: colors.buttonText,
    fontSize: 15,
    fontWeight: '700',
  },
});

export { colors, ComumStyles };
