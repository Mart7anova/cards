import { ProfileResponseType } from './Types';

import { AppRootStateType } from 'app/store';

export const selectProfile = (
  state: AppRootStateType,
): ProfileResponseType<string, number> => state.profile.profile;

export const selectProfileStatus = (state: AppRootStateType): string =>
  state.profile.status;
