import { useNavigation } from '@react-navigation/native';
import { useCameraPermissions } from 'expo-camera';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnimatedPressable from '../../../components/Button/AnimatedPressable';
import ScreenFooter from '../../../components/Button/ScreenFooter';
import CustomCamera from '../../../components/Camera/CustomCamera';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { colors } from '../../../components/Styles/ComumStyles';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from '../style/style';

const ImportarTreino = () => {
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();

  const {
    qrContainer,
    qrScreenContainer,
    tabRow,
    tabButton,
    tabButtonWrapper,
    tabButtonActive,
    tabButtonText,
    tabButtonTextActive,
    previewCard,
    previewTitle,
    previewNomeInput,
    previewExerciseItem,
    previewExerciseText,
    importButton,
    importButtonText,
    chip,
    chipText,
    scannerAbaContainer,
    chipIcon,
    manualAbaContainer,
    buscarButton,
    previewTitleSpaced,
    previewExpiraText,
  } = style;

  const [abaAtiva, setAbaAtiva] = useState('scanner');
  const [cameraVisivel, setCameraVisivel] = useState(false);
  const [codigoManual, setCodigoManual] = useState('');
  const [preview, setPreview] = useState(null);
  const [nomeCustom, setNomeCustom] = useState('');
  const [codigoAtual, setCodigoAtual] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingImportar, setLoadingImportar] = useState(false);

  const renderHeaderTitle = useCallback(
    () => <HeaderTitle title="Importar Treino" />,
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
      headerLeft: () => null,
      headerBackVisible: false,
      gestureEnabled: false,
    });
  }, [navigation, renderHeaderTitle]);

  const buscarPreview = async (codigo) => {
    try {
      setLoading(true);
      const { data } = await Api.fetchTreinoCompartilhado(codigo);
      setPreview(data);
      setNomeCustom(data.nomeTreino);
      setCodigoAtual(codigo);
    } catch {
      throwToastError('Código inválido ou expirado.');
    } finally {
      setLoading(false);
    }
  };

  const handleQrScanned = (codigo) => {
    buscarPreview(codigo);
  };

  const handleBuscarManual = () => {
    if (codigoManual.trim()) {
      buscarPreview(codigoManual.trim().toUpperCase());
    }
  };

  const handleImportar = async () => {
    if (!preview) return;
    try {
      setLoadingImportar(true);
      await Api.importarTreino({ codigo: codigoAtual, nome: nomeCustom });
      throwToastSuccess('Treino importado com sucesso!');
      navigation.navigate('ListTreino');
    } catch {
      throwToastError('Não foi possível importar o treino.');
    } finally {
      setLoadingImportar(false);
    }
  };

  const abrirScanner = async () => {
    if (!permission?.granted) {
      await requestPermission();
    }
    setCameraVisivel(true);
  };

  return (
    <View style={qrScreenContainer}>
      <ScrollView style={qrContainer}>
        <View style={tabRow}>
          <AnimatedPressable
            testID="tab-scanner"
            wrapperStyle={tabButtonWrapper}
            style={[tabButton, abaAtiva === 'scanner' && tabButtonActive]}
            onPress={() => setAbaAtiva('scanner')}
          >
            <Text
              style={[
                tabButtonText,
                abaAtiva === 'scanner' && tabButtonTextActive,
              ]}
            >
              Escanear QR
            </Text>
          </AnimatedPressable>

          <AnimatedPressable
            testID="tab-manual"
            wrapperStyle={tabButtonWrapper}
            style={[tabButton, abaAtiva === 'manual' && tabButtonActive]}
            onPress={() => setAbaAtiva('manual')}
          >
            <Text
              style={[
                tabButtonText,
                abaAtiva === 'manual' && tabButtonTextActive,
              ]}
            >
              Inserir Código
            </Text>
          </AnimatedPressable>
        </View>

        {loading && <LoadingIndicator />}

        {!loading && abaAtiva === 'scanner' && (
          <View style={scannerAbaContainer}>
            <AnimatedPressable style={chip} onPress={abrirScanner}>
              <MaterialIcons
                name="qr-code-scanner"
                size={18}
                color={colors.placeholderText}
                style={chipIcon}
              />
              <Text style={chipText}>Abrir Câmera</Text>
            </AnimatedPressable>
          </View>
        )}

        {!loading && abaAtiva === 'manual' && (
          <View style={manualAbaContainer}>
            <TextInput
              testID="input-codigo"
              style={previewNomeInput}
              placeholder="Cole ou digite o código (ex: A3K9XZ72)"
              placeholderTextColor={colors.textHint}
              value={codigoManual}
              onChangeText={setCodigoManual}
              autoCapitalize="characters"
              maxLength={8}
            />
            <AnimatedPressable
              testID="btn-buscar"
              style={[importButton, buscarButton]}
              onPress={handleBuscarManual}
            >
              <Text style={importButtonText}>Buscar Treino</Text>
            </AnimatedPressable>
          </View>
        )}

        {!loading && preview && (
          <View style={previewCard}>
            <Text style={previewTitle}>Nome do treino</Text>
            <TextInput
              style={previewNomeInput}
              value={nomeCustom}
              onChangeText={setNomeCustom}
              placeholderTextColor={colors.textHint}
            />
            <Text style={[previewTitle, previewTitleSpaced]}>Exercícios</Text>
            {preview.exercicios.map((ex) => (
              <View key={ex.id} style={previewExerciseItem}>
                <Text style={previewExerciseText}>{ex.nome}</Text>
              </View>
            ))}
            <Text style={previewExpiraText}>
              Válido até {preview.dataExpiracao}
            </Text>
          </View>
        )}

        <CustomCamera
          visible={cameraVisivel}
          onClose={() => setCameraVisivel(false)}
          mode="qrcode"
          onQrScanned={handleQrScanned}
        />
      </ScrollView>

      <ScreenFooter
        onBack={() => navigation.goBack()}
        onSave={preview ? handleImportar : undefined}
        saveLabel="IMPORTAR"
        saveIcon="download"
        loading={loadingImportar}
      />
    </View>
  );
};

export default ImportarTreino;
