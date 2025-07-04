import { StyleSheet } from 'react-native';
import { colors } from '../../Styles/ComumStyles';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    color: colors.textLight,
    fontSize: 17,
    fontWeight: '600',
  },
  subtitleStyle: {
    color: '#aaa',
    fontSize: 12,
  },
});
