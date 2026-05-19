import { StyleSheet } from 'react-native';
import { colors } from '../../../components/Styles/ComumStyles';

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 32,
  },
  intro: {
    fontSize: 13,
    color: colors.placeholderText,
    marginBottom: 20,
    lineHeight: 20,
  },
  diaCard: {
    backgroundColor: colors.inputBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  diaCardHoje: {
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  diaLabelWrap: {
    width: 84,
  },
  diaLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textLight,
    letterSpacing: 1,
  },
  diaSubLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.secondary,
    letterSpacing: 1,
    marginTop: 2,
  },
  treinoPicker: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  treinoPickerTexto: {
    flex: 1,
    color: colors.textLight,
    fontSize: 14,
    fontWeight: '600',
  },
  treinoPickerTextoVazio: {
    color: colors.textHint,
    fontWeight: '500',
    fontStyle: 'italic',
  },
});
