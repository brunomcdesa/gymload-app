import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../../context/AuthProvider';
import UsuarioInfo from '../../../modules/usuario/usuarioInfo/UsuarioInfo';
import style from './styles/style';

const SideBar = (props) => {
  const { Container, Button, ButtonText, Content, Footer } = style;
  const { logout } = useContext(AuthContext);
  const userName = 'Usuário';

  const handleLogout = async () => {
    await logout();
    props.navigation.replace('Login');
  };

  return (
    <View style={Container}>
      <View style={Content}>
        <UsuarioInfo userName={userName} />
      </View>

      <View style={Footer}>
        <TouchableOpacity style={Button} onPress={handleLogout}>
          <Text style={ButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SideBar;
