import React from 'react';
import { Link } from 'react-router-dom';
import {PATH} from '../../enums/path';
import { useAppSelector } from '../../hooks/useAppSelector';
import {getUserProfile} from '../../../features/profile/selectors';
import {Avatar} from '@mui/material';
import noUserPhoto from '../../assets/images/no-user-photo.png'
import s from './ProfileLink.module.scss'

export const ProfileLink = () => {
    const {name, avatar} = useAppSelector(getUserProfile)

    return (
        <Link to={PATH.PROFILE} className={s.userContainer}>
            <h2 className={s.name}>{name}</h2>
            <Avatar alt={name} src={avatar ? avatar : noUserPhoto}/>
        </Link>
    );
};