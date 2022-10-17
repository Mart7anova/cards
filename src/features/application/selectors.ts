import {AppRootStateType} from '../../app/store';

export const getIsInitialized = (state: AppRootStateType) => state.app.isInitialized
export const getErrorApp = (state: AppRootStateType) => state.app.error