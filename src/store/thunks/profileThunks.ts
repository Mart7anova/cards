import { createAsyncThunk } from '@reduxjs/toolkit';

import { profileApi } from 'api/profile';
import { setProfileStatus } from 'store/slices';
import { handleNetworkError } from 'utils';

export const getProfile = createAsyncThunk(
  'myProfile/setProfile',
  async (param, { rejectWithValue, dispatch }) => {
    dispatch(setProfileStatus('loading'));
    try {
      const { data } = await profileApi.me();

      return data;
    } catch (e) {
      handleNetworkError(e, dispatch);

      return rejectWithValue(null);
    } finally {
      dispatch(setProfileStatus('idle'));
    }
  },
);

export const updateProfile = createAsyncThunk(
  'myProfile/updateProfile',
  async (param: { name?: string; avatar?: string }, { dispatch, rejectWithValue }) => {
    dispatch(setProfileStatus('loading'));
    try {
      const { data } = await profileApi.updateUser(param.name, param.avatar);

      return data.updatedUser;
    } catch (e) {
      return rejectWithValue(e);
    } finally {
      dispatch(setProfileStatus('idle'));
    }
  },
);
