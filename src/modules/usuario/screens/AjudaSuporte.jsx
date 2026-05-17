import PropTypes from 'prop-types';
import React, { useCallback, useLayoutEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import formFooterStyle from '../../../components/Button/style/formFooterStyle';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import style from './styles/style';

const AjudaSuporte = (props) => {
  const { navigation } = props;
  const { screenContainer, placeholderContent, placeholderCard, placeholderText } = style;

  const renderHeaderTitle = useCallback(
    () => <HeaderTitle title="Ajuda e Suporte" />,
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
            Precisa de ajuda? Entre em contato com nosso suporte através do e-mail
            suporte@gymload.com
          </Text>
        </View>
      </View>

      <View style={formFooterStyle.formFooter}>
        <TouchableOpacity
          testID="btn-voltar"
          style={formFooterStyle.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={formFooterStyle.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

AjudaSuporte.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default AjudaSuporte;
