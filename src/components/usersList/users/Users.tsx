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
import { useNavigate } from 'react-router-dom';

import noUserPhoto from 'assets/icon/no-user-photo.png';
import style from 'components/usersList/users/Users.module.scss';
import { COUNT_PAGES } from 'constants/CountPages';
import { Path } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  selectUsers,
  selectUsersPage,
  selectUsersPageCount,
  selectUsersTotalCount,
} from 'store/selectors';
import { setUsersSearchParams } from 'store/slices';

export const Users = (): ReactElement => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const users = useAppSelector(selectUsers);
  const usersPage = useAppSelector(selectUsersPage);
  const usersPageCount = useAppSelector(selectUsersPageCount);
  const usersTotalCount = useAppSelector(selectUsersTotalCount);

  const userNavigateHandler = (userId: string): (() => void) => {
    return () => {
      dispatch(setUsersSearchParams({ page: 1, pageCount: 10 }));
      navigate(Path.USERS + userId);
    };
  };

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
            <ListItemAvatar onClick={userNavigateHandler(userId)}>
              <Avatar
                alt={name}
                src={avatar || noUserPhoto}
                className={style.userPhoto}
              />
            </ListItemAvatar>

            <ListItemText
              primary={
                <button
                  type="button"
                  onClick={userNavigateHandler(userId)}
                  className={style.userName}
                >
                  <p>{name}</p>
                </button>
              }
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
