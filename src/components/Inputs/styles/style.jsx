import { StyleSheet } from 'react-native';
import { colors } from '../../Styles/ComumStyles';

export default StyleSheet.create({
  dropDownContainerStyle: {
    borderWidth: 1,
    backgroundColor: colors.inputBackground,
    borderColor: colors.inputBorder,
  },
  dropdownItem: {
    backgroundColor: colors.inputBackground,
  },
  dropdownText: {
    color: colors.inputText,
  },
  selectedItemLabel: {
    fontWeight: 'bold',
    color: colors.secondary,
  },
  formTextInput: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: colors.inputBackground,
    color: colors.inputText,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
});
