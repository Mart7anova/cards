import React, { ReactElement, useEffect } from 'react';

import { Container, List } from '@mui/material';

import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectUsersSearchParam } from 'features/users/selectors';
import { fetchUsers } from 'features/users/slice';
import { UsersFilter } from 'features/users/UsersFilter/UsersFilter';
import { UsersList } from 'features/users/UsersList/UsersList';
import { UsersTitle } from 'features/users/UsersTitle/UsersTitle';

export const Users = (): ReactElement => {
  const dispatch = useAppDispatch();

  const { page, pageCount, min, max, userName, sortUsers } =
    useAppSelector(selectUsersSearchParam);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [page, pageCount, min, max, userName, sortUsers]);

  return (
    <Container fixed style={{ display: 'flex' }}>
      <List sx={{ width: '45%' }}>
        <UsersTitle />

        <UsersList />
      </List>

      <List sx={{ width: '45%' }} style={{ margin: '0 0 0 100px' }}>
        <UsersFilter />
      </List>
    </Container>
  );
};
