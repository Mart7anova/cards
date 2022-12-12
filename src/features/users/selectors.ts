import { AppRootStateType } from 'app/store';
import { UsersSearchParamsType, UserType } from 'features/users/Types';

export const selectUsers = (state: AppRootStateType): UserType[] =>
  state.user.users.users;

export const selectUserSearchParam = (state: AppRootStateType): UsersSearchParamsType =>
  state.user.usersSearchParams;

export const selectUsersPage = (state: AppRootStateType): number => state.user.users.page;

export const selectUsersPageCount = (state: AppRootStateType): number =>
  state.user.users.pageCount;

export const selectUsersTotalCount = (state: AppRootStateType): number =>
  state.user.users.usersTotalCount;

export const selectUsersStatus = (state: AppRootStateType): string => state.user.status;
