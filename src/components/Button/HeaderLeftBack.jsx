import { useNavigation } from '@react-navigation/native';
import React from 'react';
import HeaderBackButton from './HeaderBackButton';

const HeaderLeftBack = () => {
  const navigation = useNavigation();
  return <HeaderBackButton onPress={navigation.goBack} />;
};

export default HeaderLeftBack;
