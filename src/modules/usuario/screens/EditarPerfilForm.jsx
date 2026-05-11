import PropTypes from 'prop-types';
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import TextoInput from '../../../components/Inputs/TextoInput';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import SelectableImage from '../../../components/Selectable/SelectableImage/SelectableImage';
import { AuthContext } from '../../../context/AuthProvider';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from './styles/style';

const EditarPerfilForm = (props) => {
  const { navigation } = props;
  const { user, setUser } = useContext(AuthContext);
  const {
    screenContainer,
    scrollContent,
    formDescription,
    fieldContainer,
    fieldLabel,
    formFooter,
    backButton,
    backButtonText,
    saveButton,
    saveButtonDisabled,
    saveButtonText,
    editarPerfilAvatarSection,
    editarPerfilAvatarWrapper,
    genderSelector,
    genderButton,
    genderButtonSelected,
    genderButtonText,
    genderButtonTextSelected,
  } = style;

  const [formData, setFormData] = useState({
    nome: '',
    username: '',
    email: '',
    idade: '',
    pesoCorporal: '',
    altura: '',
    sexo: null,
  });
  const [uriImagemUsuario, setUriImagemUsuario] = useState(
    user.imagemPerfilUrl,
  );
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const renderHeaderTitle = useCallback(
    () => <HeaderTitle title="Editar Perfil" />,
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
      headerTitleAlign: 'center',
      headerLeft: () => null,
      gestureEnabled: false,
    });
  }, [navigation, renderHeaderTitle]);

  useEffect(() => {
    let isActive = true;
    const fetchUsuario = async () => {
      try {
        setFetching(true);
        const { data } = await Api.fetchDadosUsuarioLogado();
        if (!isActive) return;
        setFormData({
          nome: data.nome || '',
          username: data.username || '',
          email: data.email || '',
          idade: data.idade ? String(data.idade) : '',
          pesoCorporal: data.pesoCorporal ? String(data.pesoCorporal) : '',
          altura: data.altura ? String(data.altura) : '',
          sexo: data.sexo || null,
        });
      } catch (error) {
        throwToastError(
          error?.data?.[0]?.message || 'Erro ao buscar dados do usuário.',
        );
      } finally {
        if (isActive) setFetching(false);
      }
    };
    fetchUsuario();
    return () => {
      isActive = false;
    };
  }, []);

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    try {
      setLoading(true);
      await Api.editarDadosUsuario(user.uuid, formData, uriImagemUsuario);
      const { data: novaUrl } = await Api.fetchUrlImagemPerfil();
      setUser({ ...user, ...formData, imagemPerfilUrl: novaUrl });
      throwToastSuccess('Perfil atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      throwToastError(
        error?.data?.[0]?.message || 'Erro ao atualizar informações.',
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <View style={screenContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <View style={screenContainer}>
      <ScrollView contentContainerStyle={scrollContent}>
        <Text style={formDescription}>
          Atualize suas informações pessoais e foto de perfil.
        </Text>

        <View style={editarPerfilAvatarSection}>
          <View style={editarPerfilAvatarWrapper}>
            <SelectableImage
              uriImagemUsuario={uriImagemUsuario}
              setUriImagemUsuario={setUriImagemUsuario}
            />
          </View>
        </View>

        <View style={fieldContainer}>
          <Text style={fieldLabel}>Nome</Text>
          <TextoInput
            placeholder="Digite seu nome"
            value={formData.nome}
            onChangeText={(v) => handleChange('nome', v)}
          />
        </View>

        <View style={fieldContainer}>
          <Text style={fieldLabel}>Username</Text>
          <TextoInput
            placeholder="Digite seu username"
            value={formData.username}
            onChangeText={(v) => handleChange('username', v)}
          />
        </View>

        <View style={fieldContainer}>
          <Text style={fieldLabel}>Email</Text>
          <TextoInput
            placeholder="Digite seu email"
            value={formData.email}
            onChangeText={(v) => handleChange('email', v)}
            keyboardType="email-address"
          />
        </View>

        <View style={fieldContainer}>
          <Text style={fieldLabel}>Idade</Text>
          <TextoInput
            placeholder="Ex: 25"
            value={formData.idade}
            onChangeText={(v) => handleChange('idade', v)}
            keyboardType="numeric"
          />
        </View>

        <View style={fieldContainer}>
          <Text style={fieldLabel}>Peso (kg)</Text>
          <TextoInput
            placeholder="Ex: 75.5"
            value={formData.pesoCorporal}
            onChangeText={(v) => handleChange('pesoCorporal', v)}
            keyboardType="decimal-pad"
          />
        </View>

        <View style={fieldContainer}>
          <Text style={fieldLabel}>Altura (m)</Text>
          <TextoInput
            placeholder="Ex: 1.75"
            value={formData.altura}
            onChangeText={(v) => handleChange('altura', v)}
            keyboardType="decimal-pad"
          />
        </View>

        <View style={fieldContainer}>
          <Text style={fieldLabel}>Sexo</Text>
          <View style={genderSelector}>
            <TouchableOpacity
              style={[
                genderButton,
                formData.sexo === 'MASCULINO' && genderButtonSelected,
              ]}
              onPress={() => handleChange('sexo', 'MASCULINO')}
            >
              <Text
                style={[
                  genderButtonText,
                  formData.sexo === 'MASCULINO' && genderButtonTextSelected,
                ]}
              >
                M
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                genderButton,
                formData.sexo === 'FEMININO' && genderButtonSelected,
              ]}
              onPress={() => handleChange('sexo', 'FEMININO')}
            >
              <Text
                style={[
                  genderButtonText,
                  formData.sexo === 'FEMININO' && genderButtonTextSelected,
                ]}
              >
                F
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={formFooter}>
        <TouchableOpacity
          style={backButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={backButtonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[saveButton, loading && saveButtonDisabled]}
          onPress={!loading ? handleSave : null}
          disabled={loading}
          activeOpacity={0.7}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <MaterialIcons name="save" size={18} color="#fff" />
              <Text style={saveButtonText}>SALVAR</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

EditarPerfilForm.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

export default EditarPerfilForm;
