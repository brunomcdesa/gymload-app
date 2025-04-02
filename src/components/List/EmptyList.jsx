import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import style from './styles/style';

const EmptyList = (props) => {
  return <Text style={style.emptyList}>Nenhum {props.value} encontrado.</Text>;
};

EmptyList.propTypes = {
  value: PropTypes.string.isRequired,
};

export default EmptyList;
