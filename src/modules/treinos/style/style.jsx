import { StyleSheet } from 'react-native';
import { colors } from '../../../components/Styles/ComumStyles';

export default StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#383838',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  chipActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#aaa',
  },
  chipTextActive: {
    color: '#fff',
  },
  treinoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#383838',
    overflow: 'hidden',
    paddingVertical: 14,
    paddingRight: 14,
    gap: 12,
  },
  treinoAccentBarAtivo: {
    backgroundColor: '#28a745',
  },
  treinoAccentBarInativo: {
    backgroundColor: '#dc3545',
  },
  treinoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  treinoInfo: {
    flex: 1,
  },
  treinoNome: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textLight,
    marginBottom: 3,
  },
  treinoData: {
    fontSize: 12,
    color: '#777',
  },
  treinoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  treinoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#383838',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  situacaoIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  situacaoAtiva: {
    backgroundColor: '#4CAF50',
  },
  situacaoInativa: {
    backgroundColor: '#F44336',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#383838',
    marginBottom: 16,
  },
  checkboxLabel: {
    marginLeft: 12,
    color: colors.textLight,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedExercisesContainer: {
    marginTop: 10,
    flex: 1,
    marginBottom: 1,
  },
  selectedExercicioList: {
    height: '70%',
  },
  selectedExerciseItem: {
    backgroundColor: colors.inputBackground,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  selectedExerciseText: {
    color: colors.textLight,
    fontSize: 16,
  },
  selectedExercisesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 8,
  },
});
