import React, { ReactElement, useEffect } from 'react';

import { Avatar, Container, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

import style from './index.module.scss';

import noUserPhoto from 'common/assets/images/no-user-photo.png';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectUserProfile } from 'features/userProfile/selectors';
import { fetchUser } from 'features/userProfile/slice';

export const UserProfile = (): ReactElement => {
  const dispatch = useAppDispatch();

  const { userId } = useParams() as { userId: string };

  const { avatar, name, email } = useAppSelector(selectUserProfile);

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [userId]);

  return (
    <Container fixed>
      <div className={style.profileContainer}>
        <Paper className={style.paper}>
          <Avatar
            alt={name}
            src={avatar || noUserPhoto}
            sx={{ width: 150, height: 150 }}
          />
          <h1>{name}</h1>
          <p className={style.email}>{email}</p>
        </Paper>
      </div>
    </Container>
  );
};
