import React, {useEffect} from 'react';
import {useAppDispatch} from '../common/hooks/useAppDispatch';
import {appActions} from '../features/application';
import {useAppSelector} from '../common/hooks/useAppSelector';
import {getIsInitialized} from '../features/application/selectors';
import {AppRoute} from '../features/route/AppRoute';
import {Bar} from '../common/components/AppBar/AppBar';

const {initializeApp} = appActions

export const App = () => {
    const isInitialized = useAppSelector(getIsInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    if (!isInitialized) {
        return <h1>loading</h1>
    }

    return (
        <div>
            <Bar/>
            <AppRoute/>
        </div>
    );
}