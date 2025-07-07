import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useHeaderContext } from '../context/HeaderProvider';

export const useScreenTitle = (title, subtitle) => {
  const { setActiveTabOptions } = useHeaderContext();

  useFocusEffect(
    useCallback(() => {
      setActiveTabOptions({
        headerTitle: title,
        headerSubtitle: subtitle,
      });
    }, [setActiveTabOptions, title, subtitle]),
  );
};
