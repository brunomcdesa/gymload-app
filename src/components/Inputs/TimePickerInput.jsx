import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../Styles/ComumStyles';

const pickerStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    padding: 12,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.terciary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.textLight,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 26,
  },
  value: {
    fontSize: 42,
    fontWeight: '800',
    color: colors.secondary,
    letterSpacing: -1,
    lineHeight: 48,
    width: 64,
    textAlign: 'center',
  },
  separator: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.textLight,
    marginHorizontal: 8,
    alignSelf: 'flex-end',
    marginBottom: 4,
  },
});

const TimePickerInput = ({ time, setTime }) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();

  const changeHours = (delta) => {
    setTime(
      new Date(0, 0, 0, Math.min(23, Math.max(0, hours + delta)), minutes, 0),
    );
  };

  const changeMinutes = (delta) => {
    setTime(
      new Date(0, 0, 0, hours, Math.min(59, Math.max(0, minutes + delta)), 0),
    );
  };

  return (
    <View style={pickerStyle.container}>
      <View style={pickerStyle.column}>
        <Text style={pickerStyle.label}>H</Text>
        <View style={pickerStyle.row}>
          <TouchableOpacity
            style={pickerStyle.button}
            onPress={() => changeHours(-1)}
            activeOpacity={0.7}
          >
            <Text style={pickerStyle.buttonText}>−</Text>
          </TouchableOpacity>
          <Text style={pickerStyle.value}>
            {String(hours).padStart(2, '0')}
          </Text>
          <TouchableOpacity
            style={pickerStyle.button}
            onPress={() => changeHours(1)}
            activeOpacity={0.7}
          >
            <Text style={pickerStyle.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={pickerStyle.separator}>:</Text>

      <View style={pickerStyle.column}>
        <Text style={pickerStyle.label}>M</Text>
        <View style={pickerStyle.row}>
          <TouchableOpacity
            style={pickerStyle.button}
            onPress={() => changeMinutes(-1)}
            activeOpacity={0.7}
          >
            <Text style={pickerStyle.buttonText}>−</Text>
          </TouchableOpacity>
          <Text style={pickerStyle.value}>
            {String(minutes).padStart(2, '0')}
          </Text>
          <TouchableOpacity
            style={pickerStyle.button}
            onPress={() => changeMinutes(1)}
            activeOpacity={0.7}
          >
            <Text style={pickerStyle.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

TimePickerInput.propTypes = {
  time: PropTypes.object.isRequired,
  setTime: PropTypes.func.isRequired,
};

export default TimePickerInput;
