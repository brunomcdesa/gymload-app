import { StyleSheet } from 'react-native';
import { colors } from '../../../../components/Styles/ComumStyles';

export default StyleSheet.create({
  header: {
    marginBottom: 25,
    alignItems: 'center',
    paddingTop: 10,
  },
  titleStyle: {
    fontSize: 18,
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
  registroContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#383838',
    shadowColor: '#ff5555',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'space-between',
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  dataText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#383838',
  },
});
