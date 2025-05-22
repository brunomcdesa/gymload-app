import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context/AuthProvider';
import UsuarioInfo from '../../modules/usuario/usuarioInfo/UsuarioInfo';
import { useIsAdmin } from '../../modules/utils/userUtils';
import { ComumStyles } from '../Styles/ComumStyles';
import style from './styles/style';

const SideBar = (props) => {
  const { button, buttonCadastroAdmin, buttonText, content, footer } = style;
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

  return (
    <View style={container}>
      <View style={content}>
        <TouchableOpacity onPress={redirectToPerfilScreen}>
          <UsuarioInfo
            usuarioNome={user.nome}
            uriImagemUsuario={user.imagemPerfilUrl}
          />
        </TouchableOpacity>
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
        <TouchableOpacity style={button} onPress={handleLogout}>
          <Text style={buttonText}>Sair</Text>
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
