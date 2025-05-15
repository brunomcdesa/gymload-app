import { StyleSheet } from 'react-native';
import { colors } from '../../../components/Styles/ComumStyles';

export default StyleSheet.create({
  listContent: {
    paddingBottom: 20,
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
  treinoInfo: {
    flex: 1,
  },
  treinoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  treinoNome: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: 4,
  },
  treinoData: {
    fontSize: 13,
    color: '#aaa',
  },
  separator: {
    height: 10,
  },
  emptyList: {
    marginTop: 40,
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
