import PropTypes from 'prop-types';
import React, { useCallback, useLayoutEffect } from 'react';
import { Text, View } from 'react-native';
import AnimatedPressable from '../../../components/Button/AnimatedPressable';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import style from './styles/style';

const Notificacoes = (props) => {
  const { navigation } = props;
  const {
    screenContainer,
    placeholderContent,
    placeholderCard,
    placeholderText,
  } = style;

  const renderHeaderTitle = useCallback(
    () => <HeaderTitle title="Notificações" />,
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
      headerLeft: () => null,
    });
  }, [navigation, renderHeaderTitle]);

  return (
    <View style={screenContainer}>
      <View style={placeholderContent}>
        <View style={placeholderCard}>
          <Text style={placeholderText}>
            Recurso em desenvolvimento. Em breve você poderá gerenciar suas
            notificações por aqui.
          </Text>
        </View>
      </View>

      <View style={ComumStyles.screenFooter}>
        <AnimatedPressable
          testID="btn-voltar"
          style={ComumStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={ComumStyles.backButtonText}>Voltar</Text>
        </AnimatedPressable>
      </View>
    </View>
  );
};

Notificacoes.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default Notificacoes;
