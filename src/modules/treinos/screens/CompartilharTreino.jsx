import * as Clipboard from 'expo-clipboard';
import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import { ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
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
  } = style;

  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: () => <HeaderTitle title={treino.nome} /> });
  }, [navigation, treino.nome]);

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
          backgroundColor="#2a2a2a"
          color="#fff"
        />

        <View style={tokenDisplay}>
          <Text style={tokenText}>{dados.codigo}</Text>
        </View>

        <Text style={expiracaoText}>Válido até {dados.dataExpiracao}</Text>
      </View>

      <View style={actionRow}>
        <TouchableOpacity testID="btn-copiar" style={actionButton} onPress={copiarCodigo}>
          <MaterialIcons name="content-copy" size={18} color="#e8e8e8" />
          <Text style={actionButtonText}>Copiar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[actionButton, actionButtonPrimary]}
          onPress={compartilharNativo}
        >
          <MaterialIcons name="share" size={18} color="#fff" />
          <Text style={[actionButtonText, { color: '#fff' }]}>
            Compartilhar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

CompartilharTreino.propTypes = {
  navigation: PropTypes.shape({ setOptions: PropTypes.func.isRequired }).isRequired,
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
