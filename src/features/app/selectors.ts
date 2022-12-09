import { AppRootStateType } from 'app/store';
import { InfoType } from 'common/types/Types';

export const selectIsInitialized = (state: AppRootStateType): boolean =>
  state.app.isInitialized;

export const selectAppError = (state: AppRootStateType): InfoType => state.app.error;

export const selectAppSuccess = (state: AppRootStateType): InfoType => state.app.success;
