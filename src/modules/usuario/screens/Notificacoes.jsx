import PropTypes from 'prop-types';
import React, { useCallback, useLayoutEffect } from 'react';
import { Text, View } from 'react-native';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import style from './styles/style';

const Notificacoes = (props) => {
  const { navigation } = props;
  const { container } = ComumStyles;
  const { placeholderCard, placeholderText } = style;

  const renderHeaderTitle = useCallback(
    () => <HeaderTitle title="Notificações" />,
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: renderHeaderTitle });
  }, [navigation, renderHeaderTitle]);

  return (
    <View style={container}>
      <View style={placeholderCard}>
        <Text style={placeholderText}>
          Recurso em desenvolvimento. Em breve você poderá gerenciar suas
          notificações por aqui.
        </Text>
      </View>
    </View>
  );
};

Notificacoes.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

export default Notificacoes;
