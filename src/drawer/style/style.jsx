import { StyleSheet } from 'react-native';
import { colors } from '../../components/Styles/ComumStyles';

export default StyleSheet.create({
  headerContainer: {
    backgroundColor: '#1d1d1d',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    elevation: 4,
  },
  headerTextContainer: {
    marginBottom: 4,
    paddingTop: 10,
    alignItems: 'flex-start',
  },
  headerTitleStyle: {
    color: colors.textLight,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#aaa',
    letterSpacing: 0.3,
  },
});
