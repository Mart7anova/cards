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
import {getPacksStatus} from '../features/packs/selectors';
import {getCardsStatus} from '../features/cards/selectors';
import {ErrorSnackbar} from '../common/components/ErrorSnackbar/ErrorSnackbar';

const {initializeApp} = appActions

export const App = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(getIsInitialized)
    const authStatus = useAppSelector(getAuthStatus)
    const profileStatus = useAppSelector(getProfileStatus)
    const packsStatus = useAppSelector(getPacksStatus)
    const cardsStatus = useAppSelector(getCardsStatus)


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
                (authStatus || profileStatus || packsStatus || cardsStatus) === 'loading' && <LinearProgress />
            }
            <AppRoute/>
            <ErrorSnackbar/>
        </div>
    );
}