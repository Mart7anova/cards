import { AppRootStateType } from 'app/store';

export const selectUserProfile = (state: AppRootStateType) => state.profile.profile;
export const selectProfileStatus = (state: AppRootStateType) => state.profile.status;
