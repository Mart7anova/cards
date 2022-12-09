import React, { ReactElement } from 'react';

import { LinearProgress } from '@mui/material';

import { useAppSelector } from '../../hooks/useAppSelector';

import { selectAuthStatus } from 'features/auth/selectors';
import { selectCardsStatus } from 'features/cards/selectors';
import { selectPacksStatus } from 'features/packs/selectors';
import { selectProfileStatus } from 'features/profile/selectors';

export const ProgressBar = (): ReactElement => {
  const authStatus = useAppSelector(selectAuthStatus);
  const profileStatus = useAppSelector(selectProfileStatus);
  const packsStatus = useAppSelector(selectPacksStatus);
  const cardsStatus = useAppSelector(selectCardsStatus);

  return ((authStatus === 'loading' ||
    profileStatus === 'loading' ||
    packsStatus === 'loading' ||
    cardsStatus === 'loading') && <LinearProgress />) as React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >;
};
