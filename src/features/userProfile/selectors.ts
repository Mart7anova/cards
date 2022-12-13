import { AppRootStateType } from 'app/store';
import { UserType } from 'features/users/Types';

export const selectUserProfile = (state: AppRootStateType): UserType =>
  state.userProfile.user;
