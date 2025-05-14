import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import TextoInput from './TextoInput';

const SearchInput = (props) => {
  const { placeholder, onSearch, initialData, searchKeys = ['nome'] } = props;
  const [searchTerm, setSearchTerm] = useState('');

  useFocusEffect(
    useCallback(() => {
      setSearchTerm('');
    }, []),
  );

  const handleSearch = useCallback(
    (text) => {
      setSearchTerm(text);

      if (!text.trim()) {
        onSearch(initialData, text);
        return;
      }

      const filtered = initialData.filter((item) => {
        return searchKeys.some((key) => {
          const itemValue = item[key];
          return (
            itemValue &&
            itemValue.toString().toLowerCase().includes(text.toLowerCase())
          );
        });
      });

      onSearch(filtered, text);
    },
    [initialData, onSearch, searchKeys],
  );

  return (
    <TextoInput
      placeholder={placeholder}
      value={searchTerm}
      onChangeText={handleSearch}
    />
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  initialData: PropTypes.array.isRequired,
  searchKeys: PropTypes.arrayOf(PropTypes.string),
  styleContainer: PropTypes.object,
  styleInput: PropTypes.object,
};

export default SearchInput;
