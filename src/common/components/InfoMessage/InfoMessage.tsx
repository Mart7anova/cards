import React from 'react';
import {Alert, Snackbar} from '@mui/material';
import {infoType} from '../../types/infoType';
import {PayloadAction} from '@reduxjs/toolkit';
import {useAppDispatch} from '../../hooks/useAppDispatch';


type PropsType = {
    message: infoType
    type: 'error' | 'success'
    action: (payload: infoType) => PayloadAction<string | null, string>
}

export const InfoMessage = ({message, action, type}: PropsType) => {
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(action(null))
    };

    return (
        <Snackbar open={!!message} autoHideDuration={6000} onClose={handleClose}
                  anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}>
            <Alert severity={type} onClose={handleClose} variant={'filled'}>{message}</Alert>
        </Snackbar>
    );
};
