import { AppRootStateType } from 'store/index';
import { StatusType } from 'types';

export const selectIsLoggedIn = (state: AppRootStateType): boolean =>
  state.auth.isLoggedIn;

export const selectIsSignedUp = (state: AppRootStateType): boolean =>
  state.auth.isSignedUp;

export const selectPasswordIsChanging = (state: AppRootStateType): boolean =>
  state.auth.isPasswordChanging;

export const selectEmail = (state: AppRootStateType): string => state.auth.email;

export const selectAuthStatus = (state: AppRootStateType): StatusType =>
  state.auth.status;
