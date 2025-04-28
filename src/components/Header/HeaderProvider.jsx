import React, { createContext, useCallback, useContext, useState } from 'react';
import {
  HEADER_SUBTITLE_DASHBOARD,
  HEADER_TITLE_DASHBOARD,
} from '../../comum/constants';

const HeaderContext = createContext();

export const HeaderProvider = (props) => {
  const { children } = props;
  const [activeTabOptions, setActiveTabOptions] = useState({
    headerTitle: HEADER_TITLE_DASHBOARD,
    headerSubtitle: HEADER_SUBTITLE_DASHBOARD,
  });

  const updateHeaderOptions = useCallback((newOptions) => {
    setActiveTabOptions((prev) => {
      if (
        prev.headerTitle !== newOptions.headerTitle ||
        prev.headerSubtitle !== newOptions.headerSubtitle
      ) {
        return newOptions;
      }
      return prev;
    });
  }, []);

  return (
    <HeaderContext.Provider
      value={{ activeTabOptions, setActiveTabOptions: updateHeaderOptions }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => useContext(HeaderContext);
