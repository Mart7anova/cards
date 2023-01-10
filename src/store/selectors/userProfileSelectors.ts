import { UserType } from 'api/users';
import { AppRootStateType } from 'store/index';
import { StatusType } from 'types';

export const selectUserProfile = (state: AppRootStateType): UserType =>
  state.userProfile.user;

export const selectUserProfileStatus = (state: AppRootStateType): StatusType =>
  state.userProfile.status;
