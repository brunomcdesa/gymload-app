import { StyleSheet } from 'react-native';
import { colors } from '../../Styles/ComumStyles';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    color: colors.textLight,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitleStyle: {
    color: colors.placeholderText,
    fontSize: 13,
  },
});
