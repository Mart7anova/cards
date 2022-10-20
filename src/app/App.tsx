import React, {useEffect} from 'react';
import {useAppDispatch} from '../common/hooks/useAppDispatch';
import {appActions} from '../features/application';
import {useAppSelector} from '../common/hooks/useAppSelector';
import {getIsInitialized} from '../features/application/selectors';
import {AppRoute} from '../features/route/AppRoute';
import {NavBar} from '../common/components/NavBar/NavBar';
import {CircularProgress} from '@mui/material';
import {ErrorSnackbar} from '../common/components/ErrorSnackbar/ErrorSnackbar';
import {ProgressBar} from '../common/components/ProgressBar/ProgressBar';
import {SuccessSnackbar} from '../common/components/SuccessSnackbar/SuccessSnackbar';

const {initializeApp} = appActions

export const App = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(getIsInitialized)

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!isInitialized) {
        return <CircularProgress />
    }

    return (
        <div>
            <NavBar/>
            <ProgressBar/>
            <AppRoute/>
            <ErrorSnackbar/>
            <SuccessSnackbar/>
        </div>
    );
}