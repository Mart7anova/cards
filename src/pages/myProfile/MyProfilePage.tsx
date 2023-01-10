import React, { ChangeEvent, ReactElement } from 'react';

import { PhotoCamera } from '@mui/icons-material';
import { Avatar, Badge, Button, IconButton, Paper } from '@mui/material';

import noUserPhoto from 'assets/icon/no-user-photo.png';
import { EditableSpan } from 'components/common';
import { useAppDispatch, useAppSelector } from 'hooks';
import style from 'pages/myProfile/MyProfilePage.module.scss';
import { selectProfile } from 'store/selectors';
import { signOut, updateProfile } from 'store/thunks';
import { uploadFile } from 'utils';

export const MyProfilePage = (): ReactElement => {
  const dispatch = useAppDispatch();

  const { name, avatar, email } = useAppSelector(selectProfile);

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
