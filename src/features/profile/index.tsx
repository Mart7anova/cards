import { Avatar, Badge, Button, IconButton, Paper } from '@mui/material';
import React, { ChangeEvent } from 'react';
import noUserPhoto from 'common/assets/images/no-user-photo.png';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { getUserProfile } from './selectors';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan';
import style from './index.module.scss';
import { PhotoCamera } from '@mui/icons-material';
import { uploadFile } from 'common/utils/uploadFile';
import { updateProfile } from './slice';
import { signOut } from '../auth/slice';

export const Profile = () => {
  const dispatch = useAppDispatch();
  const { name, avatar, email } = useAppSelector(getUserProfile);

  const fileUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    uploadFile({ files: e.target.files, dispatch, actionForDispatch: updateProfile });
  };

  const nameChangeHandler = (name: string) => {
    dispatch(updateProfile({ name }));
  };

  const logOutHandler = () => {
    dispatch(signOut());
  };

  return (
    <div className={style.mainContainer}>
      <Paper className={style.paper}>
        <h1>Personal Information</h1>

        <Badge overlap={'circular'}
               anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
               badgeContent={
                 <label>
                   <input accept={'.png, .jpg, .jpeg'}
                          type='file'
                          onChange={fileUploadHandler}
                          style={{ display: 'none' }}
                   />

                   <IconButton color='primary' component='span'>
                     <PhotoCamera />
                   </IconButton>
                 </label>
               }
        ><Avatar alt={name} src={avatar ? avatar : noUserPhoto} className={style.img} />
        </Badge>

        <EditableSpan value={name} onChange={nameChangeHandler} />

        <p className={style.email}> {email} </p>

        <Button variant={'contained'} sx={{ m: 2 }} onClick={logOutHandler}>Log
          out</Button>
      </Paper>
    </div>
  );
};
