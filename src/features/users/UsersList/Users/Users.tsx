import React, { ReactElement } from 'react';

import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TablePagination,
  Typography,
} from '@mui/material';

import noUserPhoto from 'common/assets/images/no-user-photo.png';
import { COUNT_PAGES } from 'common/constants/CountPages';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import {
  selectUsers,
  selectUsersPage,
  selectUsersPageCount,
  selectUsersTotalCount,
} from 'features/users/selectors';
import { setUsersSearchParams } from 'features/users/slice';
import style from 'features/users/UsersList/Users/Users.module.scss';

export const Users = (): ReactElement => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsers);
  const usersPage = useAppSelector(selectUsersPage);
  const usersPageCount = useAppSelector(selectUsersPageCount);
  const usersTotalCount = useAppSelector(selectUsersTotalCount);

  const pageChangeHandler = (event: unknown, page: number): void => {
    dispatch(setUsersSearchParams({ page: page + 1 }));
  };

  const rowsPerPageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setUsersSearchParams({ pageCount: Number(e.target.value) }));
  };

  return (
    <>
      {users.map(({ _id: userId, name, email, avatar, publicCardPacksCount }) => (
        <div key={userId}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={name} src={avatar || noUserPhoto} />
            </ListItemAvatar>

            <ListItemText
              primary={<b>{name}</b>}
              secondary={
                <span className={style.secondaryText}>
                  <Typography component="span" variant="body2" color="text.primary">
                    {email}
                  </Typography>

                  <Typography component="span" variant="body2" color="text.primary">
                    {publicCardPacksCount}
                  </Typography>
                </span>
              }
            />
          </ListItem>

          <Divider variant="inset" component="li" />
        </div>
      ))}

      <TablePagination
        rowsPerPageOptions={COUNT_PAGES}
        rowsPerPage={usersPageCount}
        component="div"
        count={usersTotalCount}
        page={usersPage - 1}
        onPageChange={pageChangeHandler}
        onRowsPerPageChange={rowsPerPageChangeHandler}
      />
    </>
  );
};
