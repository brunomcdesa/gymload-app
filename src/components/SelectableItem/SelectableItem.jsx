import { useActionSheet } from '@expo/react-native-action-sheet';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { colors } from '../Styles/ComumStyles';
import style from './styles/style';

const SelectableItem = (props) => {
  const {
    actionSheetContainer,
    actionSheetButtonText,
    actionSheetTitle,
    actionSheetMessage,
  } = style;
  const {
    item,
    onActionSelected,
    children,
    options,
    title,
    cancelButtonIndex,
    onLongPress,
  } = props;
  const { showActionSheetWithOptions } = useActionSheet();

  const handlePress = () => {
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex: cancelButtonIndex,
        title: title || 'Selecione uma opção',
        tintColor: colors.textLight,
        containerStyle: actionSheetContainer,
        textStyle: actionSheetButtonText,
        titleTextStyle: actionSheetTitle,
        messageTextStyle: actionSheetMessage,
        separatorStyle: {
          backgroundColor: '#383838',
        },
      },
      (selectedIndex) => {
        if (onActionSelected) {
          onActionSelected(selectedIndex, item);
        }
      },
    );
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      onLongPress={onLongPress}
    >
      <View>{children}</View>
    </TouchableOpacity>
  );
};

export default SelectableItem;
