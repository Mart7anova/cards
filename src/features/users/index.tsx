import React, { ReactElement, useEffect } from 'react';

import { Container, Skeleton } from '@mui/material';

import { NoResult } from 'common/components/NoResult/NoResult';
import { AppStatus } from 'common/enums/AppStatus';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import {
  selectUsers,
  selectUserSearchParam,
  selectUsersStatus,
} from 'features/users/selectors';
import { fetchUsers } from 'features/users/slice';
import { UsersPage } from 'features/users/UsersPage/UsersPage';

export const Users = (): ReactElement => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsers);
  const usersStatus = useAppSelector(selectUsersStatus);
  const {
    page,
    pageCount,
    minPublicCardPacksCount,
    maxPublicCardPacksCount,
    userName,
    sortUsers,
  } = useAppSelector(selectUserSearchParam);

  const HAVE_USERS = !!users.length;
  const IS_USERS_LOADING = usersStatus === AppStatus.loading;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [
    page,
    pageCount,
    minPublicCardPacksCount,
    maxPublicCardPacksCount,
    userName,
    sortUsers,
  ]);

  if (IS_USERS_LOADING) {
    return <Skeleton />;
  }

  return <Container fixed>{HAVE_USERS ? <UsersPage /> : <NoResult />}</Container>;
};
