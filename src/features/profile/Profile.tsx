import {Avatar, Badge, Button, IconButton, Paper} from '@mui/material';
import React, {ChangeEvent} from 'react';
import noUserPhoto from '../../common/assets/images/no-user-photo.png';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {getUserProfile} from './selectors';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {EditableSpan} from '../../common/components/EditableSpan/EditableSpan';
import s from './Profile.module.scss';
import {PhotoCamera} from '@mui/icons-material';
import {uploadFile} from '../../common/utils/uploadFile';
import {updateProfile} from "./profileSlice";
import {signOut} from "../auth/authSlice";


export const Profile = () => {
    const dispatch = useAppDispatch()
    const {name, avatar, email} = useAppSelector(getUserProfile)

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        uploadFile({files: e.target.files, dispatch, actionForDispatch: updateProfile})
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
