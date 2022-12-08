import { AppRootStateType } from 'app/store';

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn;
export const selectIsSignedUp = (state: AppRootStateType) => state.auth.isSignedUp;
export const selectPasswordIsChanging = (state: AppRootStateType) => state.auth.passwordIsChanging;
export const selectEmail = (state: AppRootStateType) => state.auth.email;
export const selectAuthStatus = (state: AppRootStateType) => state.auth.status;