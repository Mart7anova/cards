import React, { ReactElement, useEffect } from 'react';

import { Container, List } from '@mui/material';

import { UsersFilter } from 'components/usersFilter';
import { UsersList } from 'components/usersList';
import { UsersTitle } from 'components/usersTitle';
import { useAppDispatch, useAppSelector } from 'hooks';
import style from 'pages/users/UsersPage.module.scss';
import { selectUsersSearchParam } from 'store/selectors';
import { fetchUsers } from 'store/thunks';

export const UsersPage = (): ReactElement => {
  const dispatch = useAppDispatch();

  const { page, pageCount, min, max, userName, sortUsers } =
    useAppSelector(selectUsersSearchParam);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [page, pageCount, min, max, userName, sortUsers]);

  return (
    <Container fixed style={{ display: 'flex' }} className={style.usersContainer}>
      <List className={style.users}>
        <UsersTitle />

        <UsersList />
      </List>

      <List className={style.filter}>
        <UsersFilter />
      </List>
    </Container>
  );
};
