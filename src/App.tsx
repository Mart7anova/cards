import React, { ReactElement, useEffect } from 'react';

import { Toolbar } from '@mui/material';

import { AppRoute } from 'appRoute';
import { InfoMessage, Progress, ScrollTop } from 'components/common';
import { NavBar } from 'components/navBar';
import { ProgressBar } from 'components/progressBar';
import { useAppDispatch, useAppSelector } from 'hooks';
import { selectAppError, selectAppSuccess, selectIsInitialized } from 'store/selectors';
import { setAppError, setAppSuccess } from 'store/slices';
import { initializeApp } from 'store/thunks';

export const App = (): ReactElement => {
  const dispatch = useAppDispatch();

  const isInitialized = useAppSelector(selectIsInitialized);
  const appError = useAppSelector(selectAppError);
  const appSuccess = useAppSelector(selectAppSuccess);

  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  if (!isInitialized) {
    return <Progress />;
  }

  return (
    <div>
      <NavBar />
      <ProgressBar />
      <Toolbar id="back-to-top-anchor" />
      <AppRoute />
      <InfoMessage message={appError} type="error" action={setAppError} />
      <InfoMessage message={appSuccess} type="success" action={setAppSuccess} />
      <ScrollTop />
    </div>
  );
};
