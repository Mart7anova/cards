import React from 'react';
import {useAppSelector} from '../../hooks/useAppSelector';
import {getAppSuccess} from '../../../features/application/selectors';
import {Alert, Snackbar} from '@mui/material';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {appActions} from '../../../features/application';

const {setAppSuccess} = appActions

export const SuccessSnackbar = () => {
    const dispatch = useAppDispatch()

    const appSuccess = useAppSelector(getAppSuccess)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppSuccess(null))
    };

    return (
        <Snackbar open={!!appSuccess} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}>
            <Alert severity={'success'} onClose={handleClose} variant={'filled'}>{appSuccess}</Alert>
        </Snackbar>
    );
};
