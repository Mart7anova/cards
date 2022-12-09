import React, { ReactElement } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { selectIsLoggedIn } from '../auth/selectors';

import { Path } from 'common/enums/Path';
import { useAppSelector } from 'common/hooks/useAppSelector';

const useAuth = (): boolean => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = { loggedIn: isLoggedIn };

  return user && user.loggedIn;
};

export const ProtectedRoutes = (): ReactElement => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to={Path.SIGN_IN} />;
};
