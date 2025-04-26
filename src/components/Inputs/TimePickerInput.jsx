import React, { useState } from 'react';
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import style from './styles/style';

const timeUnitMap = {
  hours: {
    get: (date) => date.getHours(),
    set: (date, value) => date.setHours(value),
    max: 23,
  },
  minutes: {
    get: (date) => date.getMinutes(),
    set: (date, value) => date.setMinutes(value),
    max: 59,
  },
  seconds: {
    get: (date) => date.getSeconds(),
    set: (date, value) => date.setSeconds(value),
    max: 59,
  },
};

const TimePickerInput = (props) => {
  const { time, setTime } = props;
  const {
    timePickerContainer,
    timeUnitContainer,
    timeUnitText,
    timeSeparator,
    timeButton,
    timeInput,
  } = style;
  const [editingUnit, setEditingUnit] = useState(null);
  const [tempValue, setTempValue] = useState('');

  const handleTimeChange = (unit, change) => {
    const newTime = new Date(time);
    const currentValue = timeUnitMap[unit].get(newTime);
    const newValue = Math.max(
      0,
      Math.min(timeUnitMap[unit].max, currentValue + change),
    );
    timeUnitMap[unit].set(newTime, newValue);
    setTime(newTime);
  };

  const handleNumberPress = (unit) => {
    setEditingUnit(unit);
    setTempValue(timeUnitMap[unit].get(time).toString());
  };

  const handleInputSubmit = () => {
    if (tempValue === '') {
      setEditingUnit(null);
      return;
    }

    const numericValue = parseInt(tempValue, 10) || 0;
    const newTime = new Date(time);
    const clampedValue = Math.max(
      0,
      Math.min(timeUnitMap[editingUnit].max, numericValue),
    );
    timeUnitMap[editingUnit].set(newTime, clampedValue);
    setTime(newTime);
    setEditingUnit(null);
    Keyboard.dismiss();
  };

  const formatTimeUnit = (unit) => {
    return unit.toString().padStart(2, '0');
  };

  const renderTimeUnit = (unit) => {
    if (editingUnit === unit) {
      return (
        <TextInput
          style={[timeUnitText, timeInput]}
          value={tempValue}
          onChangeText={(text) =>
            setTempValue(text.replace(/[^0-9]/g, '').slice(0, 2))
          }
          onSubmitEditing={handleInputSubmit}
          onBlur={handleInputSubmit}
          keyboardType="number-pad"
          maxLength={2}
          autoFocus
          selectTextOnFocus
        />
      );
    }

    return (
      <TouchableOpacity onPress={() => handleNumberPress(unit)}>
        <Text style={timeUnitText}>
          {formatTimeUnit(timeUnitMap[unit].get(time))}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderChangeableTimeUnit = (unit) => {
    return (
      <View style={timeUnitContainer}>
        <TouchableOpacity
          onPress={() => handleTimeChange(unit, 1)}
          style={timeButton}
        >
          <Ionicons name="chevron-up" size={20} color="#fff" />
        </TouchableOpacity>

        {renderTimeUnit(unit)}

        <TouchableOpacity
          onPress={() => handleTimeChange(unit, -1)}
          style={timeButton}
        >
          <Ionicons name="chevron-down" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={timePickerContainer}>
      {renderChangeableTimeUnit('hours')}

      <Text style={timeSeparator}>:</Text>

      {renderChangeableTimeUnit('minutes')}

      <Text style={timeSeparator}>:</Text>

      {renderChangeableTimeUnit('seconds')}
    </View>
  );
};

export default TimePickerInput;
