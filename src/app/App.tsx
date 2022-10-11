import React, {useEffect} from 'react';
import {useAppDispatch} from '../common/hooks/useAppDispatch';
import {appActions} from '../features/application';
import {useAppSelector} from '../common/hooks/useAppSelector';
import {getIsInitialized} from '../features/application/selectors';
import {AppRoute} from '../features/route/AppRoute';
import {Bar} from '../common/components/AppBar/AppBar';
import {CircularProgress, LinearProgress} from '@mui/material';
import {getAuthStatus} from '../features/auth/selectors';
import {getProfileStatus} from '../features/profile/selectors';

const {initializeApp} = appActions

export const App = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(getIsInitialized)
    const authStatus = useAppSelector(getAuthStatus)
    const profileStatus = useAppSelector(getProfileStatus)


    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!isInitialized) {
        return <CircularProgress />
    }

    return (
        <div>
            <Bar/>
            {
                (authStatus || profileStatus) === 'loading' && <LinearProgress />
            }
            <AppRoute/>
        </div>
    );
}