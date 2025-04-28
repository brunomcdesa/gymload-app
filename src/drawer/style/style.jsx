import { StyleSheet } from 'react-native';
import { colors } from '../../components/Styles/ComumStyles';

export default StyleSheet.create({
  headerContainer: {
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  headerTextContainer: {
    marginBottom: 20,
    paddingTop: '8%',
    alignItems: 'center',
  },
  headerTitleStyle: {
    color: colors.textLight,
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textShadowColor: 'rgba(255, 85, 85, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#aaa',
    letterSpacing: 0.5,
  },
});
