import { StyleSheet } from 'react-native';
import { colors } from '../../../../components/Styles/ComumStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.textLight,
    marginHorizontal: 10,
  },
  separatorText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cadastroButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  cadastroButtonText: {
    color: colors.buttonText,
    fontWeight: 'bold',
  },
});
