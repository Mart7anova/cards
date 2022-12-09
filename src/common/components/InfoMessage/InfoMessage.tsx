import React, { ReactElement } from 'react';

import { Alert, Snackbar } from '@mui/material';
import { PayloadAction } from '@reduxjs/toolkit';

import { useAppDispatch } from '../../hooks/useAppDispatch';

import { InfoType } from 'common/types/Types';

type PropsType = {
  message: InfoType;
  type: 'error' | 'success';
  action: (payload: InfoType) => PayloadAction<string | null, string>;
};

export const InfoMessage = ({ message, action, type }: PropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const snackbarCloseHandler = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(action(null));
  };

  return (
    <Snackbar
      open={!!message}
      autoHideDuration={6000}
      onClose={snackbarCloseHandler}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
    >
      <Alert severity={type} onClose={snackbarCloseHandler} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};
