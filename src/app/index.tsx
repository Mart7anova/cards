import React, { ReactElement, useEffect } from 'react';

import { Toolbar } from '@mui/material';

import { InfoMessage } from 'common/components/InfoMessage/InfoMessage';
import { NavBar } from 'common/components/NavBar/NavBar';
import { Progress } from 'common/components/Progress/ProgressBar';
import { ProgressBar } from 'common/components/ProgressBar/ProgressBar';
import { ScrollTop } from 'common/components/ScrollTop/ScrollTop';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import {
  selectAppError,
  selectAppSuccess,
  selectIsInitialized,
} from 'features/app/selectors';
import { initializeApp, setAppError, setAppSuccess } from 'features/app/slice';
import { AppRoute } from 'features/route';

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
