import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SelectableItem from '../../../components/Selectable/SelectableItem/SelectableItem';
import { ComumStyles } from '../../../components/Styles/ComumStyles';

const TipoVariacao = (props) => {
  const { item, onEditar } = props;
  const { elementContainer } = ComumStyles;

  const options = ['Editar', 'Cancelar'];

  const selectOptionsAction = (selectedIndex) => {
    if (selectedIndex === 0) {
      onEditar(item);
    }
  };

  return (
    <View style={elementContainer}>
      <SelectableItem
        item={item}
        cancelButtonIndex={1}
        options={options}
        onActionSelected={selectOptionsAction}
        onLongPress={() => onEditar(item)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <MaterialIcons name="tune" size={20} color="#ff5555" />
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff', flex: 1 }}>
            {item.nome}
          </Text>
        </View>
      </SelectableItem>
    </View>
  );
};

TipoVariacao.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
  }).isRequired,
  onEditar: PropTypes.func.isRequired,
};

export default TipoVariacao;
