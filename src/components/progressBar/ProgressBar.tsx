import React, { ReactElement } from 'react';

import { LinearProgress } from '@mui/material';

import { AppStatus } from 'enums';
import { useAppSelector } from 'hooks';
import {
  selectAuthStatus,
  selectCardsStatus,
  selectPacksStatus,
  selectProfileStatus,
  selectUserProfileStatus,
  selectUsersStatus,
} from 'store/selectors';

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
