import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { ROLE_ADMIN } from './constants';

export const useIsAdmin = () => {
  const { user } = useContext(AuthContext);

  return user?.roles?.includes(ROLE_ADMIN) ?? false;
};
