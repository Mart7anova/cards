import React, { ReactElement } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { Path } from 'enums';
import { useAppSelector } from 'hooks';
import { selectIsLoggedIn } from 'store/selectors';

const useAuth = (): boolean => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = { loggedIn: isLoggedIn };

  return user && user.loggedIn;
};

export const ProtectedRoutes = (): ReactElement => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to={Path.SIGN_IN} />;
};
