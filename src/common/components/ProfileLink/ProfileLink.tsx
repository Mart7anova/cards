import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '../../enums/path';
import { Avatar } from '@mui/material';
import noUserPhoto from '../../assets/images/no-user-photo.png';
import style from './ProfileLink.module.scss';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { getUserProfile } from 'features/profile/selectors';

export const ProfileLink = () => {
  const { name, avatar } = useAppSelector(getUserProfile);

  return (
    <Link to={PATH.PROFILE} className={style.userContainer}>
      <h2 className={style.name}>{name}</h2>
      <Avatar alt={name} src={avatar ? avatar : noUserPhoto} />
    </Link>
  );
};