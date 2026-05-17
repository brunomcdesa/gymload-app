import * as Clipboard from 'expo-clipboard';
import PropTypes from 'prop-types';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { ScrollView, Share, Text, View } from 'react-native';
import AnimatedPressable from '../../../components/Button/AnimatedPressable';
import QRCode from 'react-native-qrcode-svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { colors } from '../../../components/Styles/ComumStyles';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from '../style/style';

const CompartilharTreino = ({ route, navigation }) => {
  const { treino } = route.params;
  const {
    qrContainer,
    qrBox,
    qrLabel,
    tokenDisplay,
    tokenText,
    expiracaoText,
    actionRow,
    actionButton,
    actionButtonPrimary,
    actionButtonText,
    actionButtonTextLight,
  } = style;

  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState(null);

  const renderHeaderTitle = useCallback(
    () => <HeaderTitle title={treino.nome} />,
    [treino.nome],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
    });
  }, [navigation, renderHeaderTitle]);

  useEffect(() => {
    const compartilhar = async () => {
      try {
        const { data } = await Api.compartilharTreino(treino.id);
        setDados(data);
      } catch (error) {
        throwToastError('Não foi possível compartilhar o treino.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    compartilhar();
  }, [treino.id]);

  const copiarCodigo = async () => {
    await Clipboard.setStringAsync(dados.codigo);
    throwToastSuccess('Código copiado!');
  };

  const compartilharNativo = async () => {
    await Share.share({
      message: `Meu treino "${treino.nome}" no Gymload! Código: ${dados.codigo}`,
    });
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!dados) {
    return null;
  }

  return (
    <ScrollView style={qrContainer}>
      <View style={qrBox}>
        <Text style={qrLabel}>QR Code do treino</Text>
        <QRCode
          value={dados.codigo}
          size={200}
          backgroundColor={colors.inputBackground}
          color={colors.textLight}
        />

        <View style={tokenDisplay}>
          <Text style={tokenText}>{dados.codigo}</Text>
        </View>

        <Text style={expiracaoText}>Válido até {dados.dataExpiracao}</Text>
      </View>

      <View style={actionRow}>
        <AnimatedPressable
          testID="btn-copiar"
          style={actionButton}
          onPress={copiarCodigo}
        >
          <MaterialIcons
            name="content-copy"
            size={18}
            color={colors.textMuted}
          />
          <Text style={actionButtonText}>Copiar</Text>
        </AnimatedPressable>

        <AnimatedPressable
          style={[actionButton, actionButtonPrimary]}
          onPress={compartilharNativo}
        >
          <MaterialIcons name="share" size={18} color={colors.textLight} />
          <Text style={[actionButtonText, actionButtonTextLight]}>
            Compartilhar
          </Text>
        </AnimatedPressable>
      </View>
    </ScrollView>
  );
};

CompartilharTreino.propTypes = {
  navigation: PropTypes.shape({ setOptions: PropTypes.func.isRequired })
    .isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      treino: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nome: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default CompartilharTreino;
