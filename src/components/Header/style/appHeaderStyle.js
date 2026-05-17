import { Platform, StatusBar, StyleSheet } from 'react-native';
import { colors } from '../../Styles/ComumStyles';

const statusBarHeight =
  Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;

export default StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingTop: statusBarHeight + 14,
    paddingHorizontal: 22,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  titleStyle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textLight,
    letterSpacing: -0.5,
  },
  subtitleStyle: {
    fontSize: 13,
    color: colors.terciary,
    marginTop: 2,
  },
});
