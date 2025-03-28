import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../../context/AuthProvider';
import UsuarioInfo from '../../../modules/usuario/usuarioInfo/UsuarioInfo';
import { useIsAdmin } from '../../../modules/utils/userUtils';
import { ComumStyles } from '../../Styles/ComumStyles';
import style from './styles/style';

const SideBar = (props) => {
  const { Button, ButtonCadastroAdmin, ButtonText, Content, Footer } = style;
  const { Container } = ComumStyles;
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

  return (
    <View style={Container}>
      <View style={Content}>
        <UsuarioInfo usuarioNome={user.nome} />
      </View>

      {isAdmin && (
        <View style={Footer}>
          <TouchableOpacity
            style={ButtonCadastroAdmin}
            onPress={redirectCadastrarUsuarioAdmin}
          >
            <Text style={ButtonText}>Cadastrar Usuario Admin</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={Footer}>
        <TouchableOpacity style={Button} onPress={handleLogout}>
          <Text style={ButtonText}>Sair</Text>
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
