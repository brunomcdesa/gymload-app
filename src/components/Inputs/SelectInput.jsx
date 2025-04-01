import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { ComumStyles } from '../Styles/ComumStyles';

const SelectInput = (props) => {
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
      style={ComumStyles.FormSelectInput}
      setValue={setValue}
      multiple={multiple}
      onChangeValue={handleSelect}
      listMode="FLATLIST"
      mode="BADGE"
      loading={loading}
      placeholder={placeholder}
      searchable={searchable}
      searchPlaceholder={searchable ? searchPlaceholder : null}
      searchTextInputProps={
        searchable
          ? {
              maxLength: 40,
              autoCapitalize: 'none',
            }
          : null
      }
      dropDownContainerStyle={{
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f2f2f2',
      }}
      zIndex={zIndex}
      zIndexInverse={zIndexInverse}
    />
  );
};

export default SelectInput;
