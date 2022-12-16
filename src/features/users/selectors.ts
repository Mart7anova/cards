import { AppRootStateType } from 'app/store';
import { UsersSearchParamsType, UserType } from 'features/users/Types';

export const selectUsers = (state: AppRootStateType): UserType[] =>
  state.users.users.users;

export const selectMinPacksCount = (state: AppRootStateType): number =>
  state.users.users.minPublicCardPacksCount;

export const selectMaxPacksCount = (state: AppRootStateType): number =>
  state.users.users.maxPublicCardPacksCount;

export const selectUsersSearchParam = (state: AppRootStateType): UsersSearchParamsType =>
  state.users.usersSearchParams;

export const selectUsersPage = (state: AppRootStateType): number =>
  state.users.users.page;

export const selectUsersPageCount = (state: AppRootStateType): number =>
  state.users.users.pageCount;

export const selectUsersTotalCount = (state: AppRootStateType): number =>
  state.users.users.usersTotalCount;

export const selectUsersStatus = (state: AppRootStateType): string => state.users.status;
