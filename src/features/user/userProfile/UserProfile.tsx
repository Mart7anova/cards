import React, { ReactElement } from 'react';

import { Avatar, Paper } from '@mui/material';

import noUserPhoto from 'common/assets/images/no-user-photo.png';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectUserProfile } from 'features/user/selectors';
import style from 'features/user/userProfile/UserProfile.module.scss';

export const UserProfile = (): ReactElement => {
  const { avatar, name, email } = useAppSelector(selectUserProfile);

  return (
    <div className={style.profileContainer}>
      <Paper className={style.paper}>
        <Avatar alt={name} src={avatar || noUserPhoto} sx={{ width: 150, height: 150 }} />
        <h1>{name}</h1>
        <p className={style.email}>{email}</p>
      </Paper>
    </div>
  );
};
