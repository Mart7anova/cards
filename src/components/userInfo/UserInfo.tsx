import React, { ReactElement } from 'react';

import { Avatar, Paper } from '@mui/material';

import noUserPhoto from 'assets/icon/no-user-photo.png';
import style from 'components/userInfo/UserInfo.module.scss';
import { useAppSelector } from 'hooks';
import { selectUserProfile } from 'store/selectors';

export const UserInfo = (): ReactElement => {
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
