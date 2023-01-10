import { createAsyncThunk } from '@reduxjs/toolkit';

import { userApi } from 'api/users/userApi';
import { setUserProfileStatus } from 'store/slices';
import { handleNetworkError } from 'utils';

export const fetchUser = createAsyncThunk(
  'User/getUsers',
  async (userId: string, { rejectWithValue, dispatch }) => {
    dispatch(setUserProfileStatus('loading'));
    try {
      const { data } = await userApi.getUser(userId);

      return data;
    } catch (e) {
      handleNetworkError(e, dispatch);

      return rejectWithValue(null);
    } finally {
      dispatch(setUserProfileStatus('idle'));
    }
  },
);
