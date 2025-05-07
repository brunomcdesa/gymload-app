import PropTypes from 'prop-types';
import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { colors, ComumStyles } from '../Styles/ComumStyles';
import style from './styles/style';

const SelectInput = (props) => {
  const {
    dropDownContainerStyle,
    dropdownItem,
    dropdownText,
    selectedItemLabel,
  } = style;
  const {
    open,
    setOpen,
    items,
    setItems,
    value,
    setValue,
    multiple,
    loading,
    placeholder,
    searchable,
    searchPlaceholder,
    handleChange,
    field,
    zIndex,
    zIndexInverse,
  } = props;

  const handleSelect = (selectedValues) => {
    setValue(selectedValues);
    handleChange(field, selectedValues);
  };

  return (
    <DropDownPicker
      open={open}
      setOpen={setOpen}
      items={items}
      setItems={setItems}
      value={value}
      style={ComumStyles.formSelectInput}
      setValue={setValue}
      multiple={multiple}
      onChangeValue={handleSelect}
      listMode="SCROLLVIEW"
      mode="SIMPLE"
      loading={loading}
      placeholder={placeholder}
      searchable={searchable}
      searchPlaceholder={searchable ? searchPlaceholder : null}
      searchTextInputProps={
        searchable
          ? {
              style: {
                color: colors.inputText,
                backgroundColor: colors.inputBackground,
                borderColor: colors.inputBorder,
              },
              placeholderTextColor: colors.placeholderText,
              maxLength: 40,
              autoCapitalize: 'none',
            }
          : null
      }
      dropDownContainerStyle={[
        dropDownContainerStyle,
        { zIndex: zIndex * 10 + 1 },
      ]}
      listItemContainerStyle={dropdownItem}
      labelStyle={dropdownText}
      textStyle={dropdownText}
      selectedItemLabelStyle={selectedItemLabel}
      scrollViewProps={{
        nestedScrollEnabled: true,
      }}
      theme="DARK"
      arrowIconStyle={{
        tintColor: colors.textLight,
      }}
      tickIconStyle={{
        tintColor: colors.secondary,
      }}
      closeIconStyle={{
        tintColor: colors.textLight,
      }}
      zIndex={zIndex}
      zIndexInverse={zIndexInverse}
    />
  );
};

SelectInput.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  setItems: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  setValue: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
  searchable: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired,
  zIndex: PropTypes.number,
  zIndexInverse: PropTypes.number,
};

export default SelectInput;
