import React from 'react';
import { View } from 'react-native';
import style from './styles/style';

const SeparatorItem = () => {
  const { separator } = style;

  return <View style={separator} />;
};

export default SeparatorItem;
