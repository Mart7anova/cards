import React, { ReactElement } from 'react';

import { LinearProgress } from '@mui/material';

import { useAppSelector } from '../../hooks/useAppSelector';

import { AppStatus } from 'common/enums/AppStatus';
import { selectAuthStatus } from 'features/auth/selectors';
import { selectCardsStatus } from 'features/cards/selectors';
import { selectPacksStatus } from 'features/packs/selectors';
import { selectProfileStatus } from 'features/profile/selectors';
import { selectUserProfileStatus } from 'features/user/selectors';
import { selectUsersStatus } from 'features/users/selectors';

export const ProgressBar = (): ReactElement => {
  const authStatus = useAppSelector(selectAuthStatus);
  const profileStatus = useAppSelector(selectProfileStatus);
  const packsStatus = useAppSelector(selectPacksStatus);
  const cardsStatus = useAppSelector(selectCardsStatus);
  const usersStatus = useAppSelector(selectUsersStatus);
  const userProfileStatus = useAppSelector(selectUserProfileStatus);

  return ((authStatus === AppStatus.loading ||
    profileStatus === AppStatus.loading ||
    packsStatus === AppStatus.loading ||
    packsStatus === AppStatus.loading ||
    usersStatus === AppStatus.loading ||
    userProfileStatus === AppStatus.loading ||
    cardsStatus === AppStatus.loading) && <LinearProgress />) as React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >;
};
