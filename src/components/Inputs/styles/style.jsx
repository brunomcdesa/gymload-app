import { StyleSheet } from 'react-native';
import { colors } from '../../Styles/ComumStyles';

export default StyleSheet.create({
  dropDownContainerStyle: {
    borderWidth: 1,
    backgroundColor: colors.inputBackground,
    borderColor: colors.inputBorder,
  },
  timePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: '#383838',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#444',
  },
  timeUnitContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  timeButton: {
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 6,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  timeUnitText: {
    fontSize: 20,
    minWidth: 40,
    textAlign: 'center',
    color: colors.textLight,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  timeSeparator: {
    fontSize: 20,
    color: colors.textLight,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  timeInput: {
    backgroundColor: '#fff',
    color: '#333',
    textAlign: 'center',
    minWidth: 40,
    borderRadius: 4,
    padding: 2,
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
});
