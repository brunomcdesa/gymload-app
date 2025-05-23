import { StyleSheet } from 'react-native';
import { colors } from '../../Styles/ComumStyles';

export default StyleSheet.create({
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: colors.placeholderText,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.danger,
    marginTop: 10,
  },
  modalButtonText: {
    color: colors.buttonText,
    fontWeight: 'bold',
  },
});
