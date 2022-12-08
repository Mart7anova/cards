import React, { useEffect } from 'react';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { getAppError, getAppSuccess, getIsInitialized } from 'features/app/selectors';
import { AppRoute } from 'features/route';
import { NavBar } from 'common/components/NavBar/NavBar';
import { InfoMessage } from 'common/components/InfoMessage/InfoMessage';
import { ProgressBar } from 'common/components/ProgressBar/ProgressBar';
import { Progress } from 'common/components/Progress/ProgressBar';
import { initializeApp, setAppError, setAppSuccess } from 'features/app/slice';


export const App = () => {
  const dispatch = useAppDispatch();

  const isInitialized = useAppSelector(getIsInitialized);
  const appError = useAppSelector(getAppError);
  const appSuccess = useAppSelector(getAppSuccess);

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
      <AppRoute />
      <InfoMessage message={appError} type={'error'} action={setAppError} />
      <InfoMessage message={appSuccess} type={'success'} action={setAppSuccess} />
    </div>
  );
};