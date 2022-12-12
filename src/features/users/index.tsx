import React, { ReactElement, useEffect } from 'react';

import { Container, List } from '@mui/material';

import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectUserSearchParam } from 'features/users/selectors';
import { fetchUsers } from 'features/users/slice';
import { UsersList } from 'features/users/UsersList/UsersList';
import { UsersTitle } from 'features/users/UsersTitle/UsersTitle';

export const Users = (): ReactElement => {
  const dispatch = useAppDispatch();

  const {
    page,
    pageCount,
    minPublicCardPacksCount,
    maxPublicCardPacksCount,
    userName,
    sortUsers,
  } = useAppSelector(selectUserSearchParam);

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

  return (
    <Container fixed>
      <List sx={{ width: '50%' }}>
        <UsersTitle />

        <UsersList />
      </List>
    </Container>
  );
};
