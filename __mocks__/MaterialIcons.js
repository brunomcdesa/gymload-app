import React from 'react';
import { Text } from 'react-native';

const MaterialIcons = ({ name, ...props }) => <Text {...props}>{name}</Text>;

export default MaterialIcons;
