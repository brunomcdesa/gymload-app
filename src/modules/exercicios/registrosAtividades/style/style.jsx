import { StyleSheet } from 'react-native';
import { colors } from '../../../../components/Styles/ComumStyles';

export default StyleSheet.create({
  header: {
    marginBottom: 25,
    alignItems: 'center',
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    letterSpacing: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    backgroundColor: '#2a2a2a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
    marginBottom: 8,
    alignSelf: 'center',
    minWidth: '50%',
  },
  sectionHeaderText: {
    color: colors.textLight,
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  sectionSeparator: {
    height: 15,
  },
  cargaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#383838',
    justifyContent: 'space-between',
  },
  seriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
  },
  seriesText: {
    color: colors.textLight,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  cargaInfo: {
    flex: 1,
    alignItems: 'center',
  },
  timeText: {
    color: '#aaa',
    fontSize: 13,
    width: 60,
    textAlign: 'right',
  },
  footer: {
    padding: 15,
    alignItems: 'center',
  },
  registroCargaContainer: {
    alignItems: 'center',
  },
  cargaText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textLight,
    marginBottom: 2,
  },
  repeticoesText: {
    fontSize: 14,
    color: '#aaa',
  },
  unitText: {
    fontSize: 12,
    color: '#aaa',
  },
});
