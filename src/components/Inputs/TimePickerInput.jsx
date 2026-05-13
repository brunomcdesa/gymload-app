import { Picker } from '@react-native-picker/picker';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../Styles/ComumStyles';

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

const pickerStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  picker: {
    width: '100%',
    color: colors.inputText,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#888',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  separator: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textLight,
    marginHorizontal: 4,
    marginBottom: 8,
  },
});

const TimePickerInput = ({ time, setTime }) => {
  const selectedHours = time.getHours();
  const selectedMinutes = time.getMinutes();

  const handleHoursChange = (h) => {
    setTime(new Date(0, 0, 0, h, selectedMinutes, 0));
  };

  const handleMinutesChange = (m) => {
    setTime(new Date(0, 0, 0, selectedHours, m, 0));
  };

  return (
    <View style={pickerStyle.container}>
      <View style={pickerStyle.column}>
        <Text style={pickerStyle.label}>H</Text>
        <Picker
          style={pickerStyle.picker}
          selectedValue={selectedHours}
          onValueChange={handleHoursChange}
          dropdownIconColor={colors.terciary}
        >
          {HOURS.map((h) => (
            <Picker.Item
              key={h}
              label={h.toString().padStart(2, '0')}
              value={h}
              color={colors.inputText}
            />
          ))}
        </Picker>
      </View>

      <Text style={pickerStyle.separator}>:</Text>

      <View style={pickerStyle.column}>
        <Text style={pickerStyle.label}>M</Text>
        <Picker
          style={pickerStyle.picker}
          selectedValue={selectedMinutes}
          onValueChange={handleMinutesChange}
          dropdownIconColor={colors.terciary}
        >
          {MINUTES.map((m) => (
            <Picker.Item
              key={m}
              label={m.toString().padStart(2, '0')}
              value={m}
              color={colors.inputText}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

TimePickerInput.propTypes = {
  time: PropTypes.object.isRequired,
  setTime: PropTypes.func.isRequired,
};

export default TimePickerInput;
