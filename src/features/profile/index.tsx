import React, { ChangeEvent, ReactElement } from 'react';

import { PhotoCamera } from '@mui/icons-material';
import { Avatar, Badge, Button, IconButton, Paper } from '@mui/material';

import { signOut } from '../auth/slice';

import style from './index.module.scss';
import { selectUserProfile } from './selectors';
import { updateProfile } from './slice';

import noUserPhoto from 'common/assets/images/no-user-photo.png';
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { uploadFile } from 'common/utils/uploadFile';

export const Profile = (): ReactElement => {
  const dispatch = useAppDispatch();

  const { name, avatar, email } = useAppSelector(selectUserProfile);

  const fileUploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    uploadFile({ files: e.target.files, dispatch, actionForDispatch: updateProfile });
  };

  const nameChangeHandler = (name: string): void => {
    dispatch(updateProfile({ name }));
  };

  const logOutHandler = (): void => {
    dispatch(signOut());
  };

  return (
    <div className={style.mainContainer}>
      <Paper className={style.paper}>
        <h1>Personal Information</h1>

        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label>
              <input
                accept=".png, .jpg, .jpeg"
                type="file"
                onChange={fileUploadHandler}
                style={{ display: 'none' }}
              />

              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          }
        >
          <Avatar alt={name} src={avatar || noUserPhoto} className={style.img} />
        </Badge>

        <EditableSpan value={name} onChange={nameChangeHandler} />

        <p className={style.email}> {email} </p>

        <Button variant="contained" sx={{ m: 2 }} onClick={logOutHandler}>
          Log out
        </Button>
      </Paper>
    </div>
  );
};
