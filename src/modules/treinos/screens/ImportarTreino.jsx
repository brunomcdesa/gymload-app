import { useNavigation } from '@react-navigation/native';
import { useCameraPermissions } from 'expo-camera';
import React, { useLayoutEffect, useState } from 'react';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomCamera from '../../../components/Camera/CustomCamera';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from '../style/style';

const ImportarTreino = () => {
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();

  const {
    qrContainer,
    tabRow,
    tabButton,
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
  } = style;

  const [abaAtiva, setAbaAtiva] = useState('scanner');
  const [cameraVisivel, setCameraVisivel] = useState(false);
  const [codigoManual, setCodigoManual] = useState('');
  const [preview, setPreview] = useState(null);
  const [nomeCustom, setNomeCustom] = useState('');
  const [codigoAtual, setCodigoAtual] = useState('');
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: () => <HeaderTitle title="Importar Treino" /> });
  }, [navigation]);

  const buscarPreview = async (codigo) => {
    try {
      setLoading(true);
      const { data } = await Api.fetchTreinoCompartilhado(codigo);
      setPreview(data);
      setNomeCustom(data.nomeTreino);
      setCodigoAtual(codigo);
    } catch (error) {
      throwToastError('Código inválido ou expirado.');
      console.error(error);
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
    try {
      setLoading(true);
      await Api.importarTreino({ codigo: codigoAtual, nome: nomeCustom });
      throwToastSuccess('Treino importado com sucesso!');
      navigation.navigate('ListTreino');
    } catch (error) {
      throwToastError('Não foi possível importar o treino.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const abrirScanner = async () => {
    if (!permission?.granted) {
      await requestPermission();
    }
    setCameraVisivel(true);
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView style={qrContainer}>
      <View style={tabRow}>
        <TouchableOpacity
          testID="tab-scanner"
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
        </TouchableOpacity>

        <TouchableOpacity
          testID="tab-manual"
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
        </TouchableOpacity>
      </View>

      {abaAtiva === 'scanner' && (
        <View style={{ alignItems: 'center', padding: 24 }}>
          <TouchableOpacity style={chip} onPress={abrirScanner}>
            <MaterialIcons
              name="qr-code-scanner"
              size={18}
              color="#aaa"
              style={{ marginRight: 6 }}
            />
            <Text style={chipText}>Abrir Câmera</Text>
          </TouchableOpacity>
        </View>
      )}

      {abaAtiva === 'manual' && (
        <View style={{ padding: 20 }}>
          <TextInput
            testID="input-codigo"
            style={previewNomeInput}
            placeholder="Cole ou digite o código (ex: A3K9XZ72)"
            placeholderTextColor="#666"
            value={codigoManual}
            onChangeText={setCodigoManual}
            autoCapitalize="characters"
            maxLength={8}
          />
          <TouchableOpacity
            testID="btn-buscar"
            style={[importButton, { marginHorizontal: 0, marginTop: 12 }]}
            onPress={handleBuscarManual}
          >
            <Text style={importButtonText}>Buscar Treino</Text>
          </TouchableOpacity>
        </View>
      )}

      {preview && (
        <>
          <View style={previewCard}>
            <Text style={previewTitle}>Nome do treino</Text>
            <TextInput
              style={previewNomeInput}
              value={nomeCustom}
              onChangeText={setNomeCustom}
              placeholderTextColor="#666"
            />
            <Text style={[previewTitle, { marginTop: 8 }]}>Exercícios</Text>
            {preview.exercicios.map((ex) => (
              <View key={ex.id} style={previewExerciseItem}>
                <Text style={previewExerciseText}>{ex.nome}</Text>
              </View>
            ))}
            <Text style={{ color: '#666', fontSize: 12, marginTop: 8 }}>
              Válido até {preview.dataExpiracao}
            </Text>
          </View>

          <TouchableOpacity
            testID="btn-importar"
            style={importButton}
            onPress={handleImportar}
          >
            <Text style={importButtonText}>Importar Treino</Text>
          </TouchableOpacity>
        </>
      )}

      <CustomCamera
        visible={cameraVisivel}
        onClose={() => setCameraVisivel(false)}
        mode="qrcode"
        onQrScanned={handleQrScanned}
      />
    </ScrollView>
  );
};

export default ImportarTreino;
