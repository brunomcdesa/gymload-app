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
  historicoTitulo: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 1,
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
  botaoHistorico: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    marginTop: 8,
  },
  botaoTexto: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: '#383838',
    marginVertical: 12,
  },
});
