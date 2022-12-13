import { AppRootStateType } from 'app/store';
import { StatusType } from 'common/types/Types';
import { UserType } from 'features/users/Types';

export const selectUserProfile = (state: AppRootStateType): UserType =>
  state.userProfile.user;

export const selectUserProfileStatus = (state: AppRootStateType): StatusType =>
  state.userProfile.status;
