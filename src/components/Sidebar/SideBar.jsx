import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context/AuthProvider';

import UsuarioInfo from '../../modules/usuario/components/UsuarioInfo';
import { useIsAdmin } from '../../modules/utils/userUtils';
import { ComumStyles } from '../Styles/ComumStyles';
import style from './styles/style';

const SideBar = (props) => {
  const {
    logoutButton,
    buttonCadastroAdmin,
    logoutButtonText,
    content,
    footer,
    button,
    buttonText,
    buttonsContainer,
  } = style;
  const { container } = ComumStyles;
  const { logout, user } = useContext(AuthContext);
  const { navigation } = props;
  const isAdmin = useIsAdmin();

  const handleLogout = async () => {
    await logout();
    navigation.replace('Login');
  };

  const redirectCadastrarUsuarioAdmin = () => {
    navigation.navigate('UsuarioCadastroForm', {
      isCadastroAdmin: true,
    });

    navigation.closeDrawer();
  };

  const redirectToPerfilScreen = () => {
    navigation.navigate('Perfil');
  };

  const redirectGerenciarUsuarios = () => {
    navigation.navigate('GerenciarUsuarios');

    navigation.closeDrawer();
  };

  return (
    <View style={container}>
      <View style={content}>
        <TouchableOpacity onPress={redirectToPerfilScreen}>
          <UsuarioInfo
            usuarioNome={user.nome}
            uriImagemUsuario={user.imagemPerfilUrl}
          />
        </TouchableOpacity>

        <View style={buttonsContainer}>
          {isAdmin && (
            <TouchableOpacity
              style={button}
              onPress={redirectGerenciarUsuarios}
            >
              <Text style={buttonText}>Gerenciar Usuários</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isAdmin && (
        <View style={footer}>
          <TouchableOpacity
            style={buttonCadastroAdmin}
            onPress={redirectCadastrarUsuarioAdmin}
          >
            <Text style={buttonText}>Cadastrar Usuario Admin</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={footer}>
        <TouchableOpacity style={logoutButton} onPress={handleLogout}>
          <Text style={logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

SideBar.propTypes = {
  navigation: PropTypes.shape({
    replace: PropTypes.func,
    navigate: PropTypes.func.isRequired,
    closeDrawer: PropTypes.func.isRequired,
  }).isRequired,
};
export default SideBar;
