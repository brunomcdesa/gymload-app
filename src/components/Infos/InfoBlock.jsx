import PropTypes from 'prop-types';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from './styles/style';

const InfoBlock = ({
  icon,
  label,
  value,
  isEditing,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  field,
  children,
}) => {
  const { infoBlock, infoBlockHeader, infoIcon, infoLabel, input, infoValue } =
    style;

  return (
    <View style={infoBlock}>
      <View style={infoBlockHeader}>
        <Icon name={icon} size={20} color={infoIcon.color} />
        <Text style={infoLabel}>{label}</Text>
      </View>
      <View>
        {isEditing ? (
          children || (
            <TextInput
              style={input}
              value={String(value || '')}
              onChangeText={(text) => onChangeText(field, text)}
              placeholder={placeholder}
              placeholderTextColor="#666"
              keyboardType={keyboardType}
            />
          )
        ) : (
          <Text style={infoValue}>{value || 'Não informado'}</Text>
        )}
      </View>
    </View>
  );
};

InfoBlock.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isEditing: PropTypes.bool.isRequired,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  field: PropTypes.string,
  children: PropTypes.node,
};

export default InfoBlock;
