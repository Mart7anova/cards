import { AppRootStateType } from 'store/index';
import { InfoType } from 'types';

export const selectIsInitialized = (state: AppRootStateType): boolean =>
  state.app.isInitialized;

export const selectAppError = (state: AppRootStateType): InfoType => state.app.error;

export const selectAppSuccess = (state: AppRootStateType): InfoType => state.app.success;
