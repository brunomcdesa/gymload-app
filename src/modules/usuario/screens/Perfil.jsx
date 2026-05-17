import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import AnimatedPressable from '../../../components/Button/AnimatedPressable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import { colors } from '../../../components/Styles/ComumStyles';
import { AuthContext } from '../../../context/AuthProvider';
import { useScreenTitle } from '../../../hooks/useScreenTitle';
import { throwToastError } from '../../utils/toastUtils';
import { useIsAdmin } from '../../utils/userUtils';
import * as Api from '../Api';
import style from './styles/style';

const MENU_ICON_SIZE = 22;
const CHEVRON_SIZE = 20;
const INFO_ICON_SIZE = 18;

const getInitials = (nome, username) => {
  if (nome) {
    const partes = nome.trim().split(/\s+/);
    const primeira = partes[0]?.[0] || '';
    const ultima = partes.length > 1 ? partes[partes.length - 1]?.[0] : '';
    return `${primeira}${ultima}`.toUpperCase();
  }
  if (username) {
    return username[0]?.toUpperCase() || '';
  }
  return '';
};

const formatarMesAno = (dataCadastro) => {
  if (!dataCadastro) {
    return null;
  }
  try {
    const data = new Date(dataCadastro);
    if (Number.isNaN(data.getTime())) {
      return null;
    }
    return new Intl.DateTimeFormat('pt-BR', {
      month: 'short',
      year: 'numeric',
    }).format(data);
  } catch {
    return null;
  }
};

const MenuRow = ({ icon, label, onPress, danger = false }) => {
  const labelStyle = danger ? style.menuRowLabelDanger : style.menuRowLabel;
  const iconColor = danger ? colors.danger : colors.terciary;

  return (
    <AnimatedPressable onPress={onPress}>
      <View style={style.menuRow}>
        <MaterialIcons name={icon} size={MENU_ICON_SIZE} color={iconColor} />
        <Text style={labelStyle}>{label}</Text>
        <MaterialIcons
          name="chevron-right"
          size={CHEVRON_SIZE}
          color={colors.terciary}
        />
      </View>
    </AnimatedPressable>
  );
};

MenuRow.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  danger: PropTypes.bool,
};

const InfoRow = ({ icon, label, value, isLast = false }) => {
  return (
    <View style={isLast ? style.infoRowReadLast : style.infoRowRead}>
      <MaterialIcons
        name={icon}
        size={INFO_ICON_SIZE}
        color={colors.terciary}
        style={style.infoIcon}
      />
      <Text style={style.infoLabel}>{label}</Text>
      <Text style={style.infoValue}>{value}</Text>
    </View>
  );
};

InfoRow.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
};

const formatSexo = (sexo) => {
  if (sexo === 'MASCULINO') return 'Masculino';
  if (sexo === 'FEMININO') return 'Feminino';
  return null;
};

const Perfil = (props) => {
  const { navigation } = props;
  const { user, logout } = useContext(AuthContext);
  const isAdmin = useIsAdmin();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useScreenTitle('Meu Perfil', 'Sua conta e ajustes');

  const fetchDadosUsuario = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchDadosUsuarioLogado();
      setUsuario(data);
    } catch (error) {
      throwToastError(
        error?.data?.[0]?.message || 'Erro ao buscar dados do usuário.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchDadosUsuario();
    }, [fetchDadosUsuario]),
  );

  const handleLogout = async () => {
    await logout();
  };

  if (loading || !usuario) {
    return (
      <View style={style.screenContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  const mesAno = formatarMesAno(usuario.dataCadastro);
  const subtitle = mesAno
    ? `${usuario.username} · Membro desde ${mesAno}`
    : usuario.username;

  const infoRows = [
    usuario.email && { icon: 'email', label: 'Email', value: usuario.email },
    usuario.idade && {
      icon: 'cake',
      label: 'Idade',
      value: `${usuario.idade} anos`,
    },
    usuario.pesoCorporal && {
      icon: 'fitness-center',
      label: 'Peso',
      value: `${usuario.pesoCorporal} kg`,
    },
    usuario.altura && {
      icon: 'height',
      label: 'Altura',
      value: `${usuario.altura} m`,
    },
    formatSexo(usuario.sexo) && {
      icon: 'wc',
      label: 'Sexo',
      value: formatSexo(usuario.sexo),
    },
  ].filter(Boolean);

  return (
    <ScrollView
      style={style.screenContainer}
      contentContainerStyle={style.perfilScrollContent}
    >
      <View style={style.avatarCard}>
        {user.imagemPerfilUrl ? (
          <Image
            source={{ uri: user.imagemPerfilUrl }}
            style={style.avatarImage}
          />
        ) : (
          <View style={style.avatarGradient}>
            <Text style={style.avatarInitials}>
              {getInitials(usuario.nome, usuario.username)}
            </Text>
          </View>
        )}
        <Text style={style.nomeText}>{usuario.nome}</Text>
        <Text style={style.subtitleText}>{subtitle}</Text>
      </View>

      {infoRows.length > 0 && (
        <View style={style.infoCard}>
          <Text style={style.infoCardTitle}>Informações da Conta</Text>
          {infoRows.map((row, index) => (
            <InfoRow
              key={row.label}
              icon={row.icon}
              label={row.label}
              value={row.value}
              isLast={index === infoRows.length - 1}
            />
          ))}
        </View>
      )}

      <MenuRow
        icon="edit"
        label="Editar perfil"
        onPress={() => navigation.navigate('EditarPerfilForm')}
      />
      <MenuRow
        icon="notifications"
        label="Notificações"
        onPress={() => navigation.navigate('Notificacoes')}
      />
      <MenuRow
        icon="lock"
        label="Senha e segurança"
        onPress={() => navigation.navigate('AlterarSenhaForm')}
      />
      <MenuRow
        icon="help"
        label="Ajuda e suporte"
        onPress={() => navigation.navigate('AjudaSuporte')}
      />
      {isAdmin && (
        <MenuRow
          icon="manage-accounts"
          label="Gerenciar Usuários"
          onPress={() => navigation.navigate('GerenciarUsuariosStack')}
        />
      )}
      {isAdmin && (
        <MenuRow
          icon="tune"
          label="Tipos de Variações"
          onPress={() => navigation.navigate('TiposVariacoesStack')}
        />
      )}
      {isAdmin && (
        <MenuRow
          icon="man"
          label="Grupos Musculares"
          onPress={() => navigation.navigate('GruposMuscularesStack')}
        />
      )}
      {isAdmin && (
        <MenuRow
          icon="person-add"
          label="Cadastrar Usuário Admin"
          onPress={() =>
            navigation.navigate('UsuarioCadastroForm', {
              isCadastroAdmin: true,
            })
          }
        />
      )}
      <MenuRow icon="logout" label="Sair" onPress={handleLogout} danger />
    </ScrollView>
  );
};

Perfil.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Perfil;
