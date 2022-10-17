import React from 'react';
import {useAppSelector} from '../../hooks/useAppSelector';
import {getErrorApp} from '../../../features/application/selectors';
import {Alert, Snackbar} from '@mui/material';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import { appActions } from '../../../features/application';

const {setAppError} = appActions

export const ErrorSnackbar = () => {
    const dispatch = useAppDispatch()

    const errorApp = useAppSelector(getErrorApp)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppError(null))
    };

    return (
        <Snackbar open={!!errorApp} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}>
            <Alert severity={'error'} onClose={handleClose}>{errorApp}</Alert>
        </Snackbar>
    );
};
