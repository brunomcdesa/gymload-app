import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SelectableItem from '../../../components/Selectable/SelectableItem/SelectableItem';
import { ComumStyles, colors } from '../../../components/Styles/ComumStyles';

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
        <View style={localStyles.row}>
          <MaterialIcons name="tune" size={20} color={colors.secondary} />
          <Text style={localStyles.nome}>{item.nome}</Text>
        </View>
      </SelectableItem>
    </View>
  );
};

const localStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
    flex: 1,
  },
});

TipoVariacao.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
  }).isRequired,
  onEditar: PropTypes.func.isRequired,
};

export default TipoVariacao;
