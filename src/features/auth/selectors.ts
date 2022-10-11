import {AppRootStateType} from '../../app/store';

export const getIsLoggedIn = (state: AppRootStateType)=> state.auth.isLoggedIn
export const getIsSignedUp = (state: AppRootStateType) => state.auth.isSignedUp
export const getPasswordIsChanging = (state: AppRootStateType) => state.auth.passwordIsChanging
export const getEmail = (state: AppRootStateType) => state.auth.email
export const getAuthStatus = (state: AppRootStateType) => state.auth.status