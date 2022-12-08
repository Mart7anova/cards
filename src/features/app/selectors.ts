import { AppRootStateType } from 'app/store';

export const selectIsInitialized = (state: AppRootStateType) => state.app.isInitialized;
export const selectAppError = (state: AppRootStateType) => state.app.error;
export const selectAppSuccess = (state: AppRootStateType) => state.app.success;