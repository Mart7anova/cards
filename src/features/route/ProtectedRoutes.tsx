import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {PATH} from '../../common/enums/path';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {getIsLoggedIn} from '../auth/selectors';

const useAuth = () => {
    const isLoggedIn = useAppSelector(getIsLoggedIn)
    const user = {loggedIn: isLoggedIn}
    return user && user.loggedIn
}

export const ProtectedRoutes = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet/> : <Navigate to={PATH.SIGN_IN}/>
};
