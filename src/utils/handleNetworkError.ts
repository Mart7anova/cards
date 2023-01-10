import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { setAppError } from 'store/slices';

export const handleNetworkError = (e: any, dispatch: Dispatch): void => {
  const error = e as Error | AxiosError<{ error: string }>;

  if (axios.isAxiosError(error)) {
    const newError = error.response?.data ? error.response.data.error : error.message;

    dispatch(setAppError(newError));
  } else {
    dispatch(setAppError(error.message ? error.message : 'Some error occurred'));
  }
};
