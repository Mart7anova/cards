import { createAsyncThunk } from '@reduxjs/toolkit';

import { userApi } from 'api/users';
import { AppRootStateType } from 'store/index';
import { setUserStatus } from 'store/slices';
import { handleNetworkError } from 'utils';

export const fetchUsers = createAsyncThunk(
  'User/getUsers',
  async (param, { rejectWithValue, dispatch, getState }) => {
    dispatch(setUserStatus('loading'));
    try {
      const state = getState() as AppRootStateType;
      const searchParams = state.users.usersSearchParams;

      const { data } = await userApi.getUsers(searchParams);

      return data;
    } catch (e) {
      handleNetworkError(e, dispatch);

      return rejectWithValue(null);
    } finally {
      dispatch(setUserStatus('idle'));
    }
  },
);
