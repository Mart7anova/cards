import React from 'react';
import {useAppSelector} from '../../hooks/useAppSelector';
import {getAuthStatus} from '../../../features/auth/selectors';
import {getProfileStatus} from '../../../features/profile/selectors';
import {getPacksStatus} from '../../../features/packs/selectors';
import {LinearProgress} from '@mui/material';

export const ProgressBar = () => {
    const authStatus = useAppSelector(getAuthStatus)
    const profileStatus = useAppSelector(getProfileStatus)
    const packsStatus = useAppSelector(getPacksStatus)

    return (
        <>
            {
                (authStatus === 'loading'
                    || profileStatus === 'loading'
                    || packsStatus === 'loading') && <LinearProgress />
            }
        </>
    );
};