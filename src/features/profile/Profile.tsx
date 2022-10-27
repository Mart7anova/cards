import {Avatar, Badge, Button, IconButton, Paper} from '@mui/material';
import React, {ChangeEvent} from 'react';
import noUserPhoto from '../../assets/images/no-user-photo.png';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {getUserProfile} from './selectors';
import {authActions} from '../auth';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {EditableSpan} from '../../common/components/EditableSpan/EditableSpan';
import {profileActions} from './index';
import s from './Profile.module.scss';
import {PhotoCamera} from '@mui/icons-material';
import {convertFileToBase64} from '../../common/utils/convertFileToBase64';
import {appActions} from '../app';

const {setAppError} = appActions
const {signOut} = authActions
const {updateProfile} = profileActions

export const Profile = () => {
    const dispatch = useAppDispatch()
    const {name, avatar, email} = useAppSelector(getUserProfile)

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    dispatch(updateProfile({avatar: file64}))
                })
            } else {
                dispatch(setAppError('The file is too large'))
            }
        }
    }

    const onNameChange = (name: string) => {
        dispatch(updateProfile({name}))
    }

    const onClickHandler = () => {
        dispatch(signOut())
    }

    return (
        <div className={s.mainContainer}>
            <Paper className={s.paper}>

                <h1>Personal Information</h1>
                <Badge overlap={'circular'}
                       anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                       badgeContent={
                           <label>
                               <input accept={'.png, .jpg, .jpeg'}
                                      type="file"
                                      onChange={uploadHandler}
                                      style={{display: 'none'}}
                               />
                               <IconButton color="primary" component="span">
                                   <PhotoCamera/>
                               </IconButton>
                           </label>
                       }>
                    <Avatar alt={name} src={avatar ? avatar : noUserPhoto} className={s.img}/>
                </Badge>
                <EditableSpan value={name} onChange={onNameChange}/>
                <p className={s.email}> {email} </p>

                <Button variant={'contained'} sx={{m: 2}} onClick={onClickHandler}>Log out</Button>
            </Paper>
        </div>
    );
};
