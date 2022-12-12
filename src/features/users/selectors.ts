import { AppRootStateType } from 'app/store';
import { UsersSearchParamsType, UserType } from 'features/users/Types';

export const selectUsers = (state: AppRootStateType): UserType[] =>
  state.user.users.users;

export const selectUserSearchParam = (state: AppRootStateType): UsersSearchParamsType =>
  state.user.usersSearchParams;
