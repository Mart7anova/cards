import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectAuthStatus } from 'features/auth/selectors';
import { selectProfileStatus } from 'features/profile/selectors';
import { selectPacksStatus } from 'features/packs/selectors';
import { LinearProgress } from '@mui/material';
import { selectCardsStatus } from 'features/cards/selectors';

export const ProgressBar = () => {
  const authStatus = useAppSelector(selectAuthStatus);
  const profileStatus = useAppSelector(selectProfileStatus);
  const packsStatus = useAppSelector(selectPacksStatus);
  const cardsStatus = useAppSelector(selectCardsStatus);

  return (
    <>
      {
        (
          authStatus === 'loading'
          || profileStatus === 'loading'
          || packsStatus === 'loading'
          || cardsStatus === 'loading'
        ) && <LinearProgress />
      }
    </>
  );
};