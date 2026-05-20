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
  diasChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  diaToggleChip: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diaToggleChipSelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  diaToggleChipOccupied: {
    borderColor: '#f0ad4e',
  },
  diaToggleChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.placeholderText,
  },
  diaToggleChipTextSelected: {
    color: colors.textLight,
  },
  ocupadoLegenda: {
    fontSize: 11,
    color: '#f0ad4e',
    textAlign: 'center',
    marginTop: 4,
  },
});
