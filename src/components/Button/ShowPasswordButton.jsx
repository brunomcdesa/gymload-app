import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import style from './style/style';

const ShowPasswordButton = (props) => {
  const { showPassword, setShowPassword } = props;

  return (
    <TouchableOpacity
      onPress={() => setShowPassword(!showPassword)}
      style={style.passwordShow}
    >
      <MaterialIcons
        name={showPassword ? 'visibility' : 'visibility-off'}
        size={24}
        color="#666"
      />
    </TouchableOpacity>
  );
};

ShowPasswordButton.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  setShowPassword: PropTypes.func.isRequired,
};

export default ShowPasswordButton;
