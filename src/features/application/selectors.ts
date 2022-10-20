import {AppRootStateType} from '../../app/store';

export const getIsInitialized = (state: AppRootStateType) => state.app.isInitialized
export const getAppError = (state: AppRootStateType) => state.app.error
export const getAppSuccess = (state: AppRootStateType) => state.app.success