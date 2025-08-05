import { StyleSheet } from 'react-native';
import { colors } from '../../../components/Styles/ComumStyles';

export default StyleSheet.create({
  exercicioHeader: {
    marginBottom: 12,
  },
  exercicioNome: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  grupoMuscularText: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  descricaoText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  historicoSection: {
    marginBottom: 16,
  },
  destaquesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  destaqueBox: {
    alignItems: 'center',
    flex: 1,
  },
  destaqueLabel: {
    fontSize: 11,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 1,
  },
  recordeValue: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.secondary,
    textAlign: 'center',
  },
  ultimoDadoValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#383838',
    marginVertical: 12,
  },
  gridScreen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textLight,
    textAlign: 'center',
    marginVertical: 24,
  },
  gridButton: {
    flex: 1,
    margin: 8,
    aspectRatio: 1,
    backgroundColor: colors.inputBackground,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  gridButtonInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  gridButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 8,
  },
  listHeader: {
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: colors.background,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    paddingVertical: 5,
  },
  backButtonText: {
    color: colors.secondary,
    fontSize: 18,
    fontWeight: '700',
  },
});
