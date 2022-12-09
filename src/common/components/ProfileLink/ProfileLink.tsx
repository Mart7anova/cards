import React, { ReactElement } from 'react';

import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

import noUserPhoto from '../../assets/images/no-user-photo.png';

import style from './ProfileLink.module.scss';

import { Path } from 'common/enums/Path';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectUserProfile } from 'features/profile/selectors';

export const ProfileLink = (): ReactElement => {
  const { name, avatar } = useAppSelector(selectUserProfile);

  return (
    <Link to={Path.PROFILE} className={style.userContainer}>
      <h2 className={style.name}>{name}</h2>
      <Avatar alt={name} src={avatar || noUserPhoto} />
    </Link>
  );
};
