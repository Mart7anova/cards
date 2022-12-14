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

import noUserPhoto from 'common/assets/images/no-user-photo.png';
import { COUNT_PAGES } from 'common/constants/CountPages';
import { AppStatus } from 'common/enums/AppStatus';
import { Path } from 'common/enums/Path';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import {
  selectUsers,
  selectUsersPage,
  selectUsersPageCount,
  selectUsersStatus,
  selectUsersTotalCount,
} from 'features/users/selectors';
import { setUsersSearchParams } from 'features/users/slice';
import { SkeletonUsers } from 'features/users/UsersList/SkeletonUsers/SkeletonUsers';
import style from 'features/users/UsersList/Users/Users.module.scss';

export const Users = (): ReactElement => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const users = useAppSelector(selectUsers);
  const usersPage = useAppSelector(selectUsersPage);
  const usersPageCount = useAppSelector(selectUsersPageCount);
  const usersTotalCount = useAppSelector(selectUsersTotalCount);
  const usersStatus = useAppSelector(selectUsersStatus);

  const IS_USERS_LOADING = usersStatus === AppStatus.loading;

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

  if (IS_USERS_LOADING || !usersPageCount) {
    return <SkeletonUsers />;
  }

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
