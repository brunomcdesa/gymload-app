import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import style from './styles/style';

const EmptyList = (props) => {
  const { value, isSelect } = props;
  return (
    <Text style={style.emptyList}>
      Nenhum {value} {isSelect ? 'selecionado' : 'encontrado'}.
    </Text>
  );
};

EmptyList.propTypes = {
  value: PropTypes.string.isRequired,
  isSelect: PropTypes.bool,
};

export default EmptyList;
