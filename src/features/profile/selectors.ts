import {AppRootStateType} from '../../app/store';

export const getProfile = (state: AppRootStateType) => state.profile.profile
export const getProfileStatus = (state: AppRootStateType) => state.profile.status
