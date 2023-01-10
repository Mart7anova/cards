import { ProfileResponseType } from 'api/profile';
import { AppRootStateType } from 'store/index';

export const selectProfile = (
  state: AppRootStateType,
): ProfileResponseType<string, number> => state.profile.profile;

export const selectProfileStatus = (state: AppRootStateType): string =>
  state.profile.status;
