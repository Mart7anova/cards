import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { profileApi } from './api';

import { StatusType } from 'common/types/Types';
import { handleNetworkError } from 'common/utils/handleNetworkError';
import { ProfileResponseType } from 'features/profile/Types';

export const getProfile = createAsyncThunk(
  'profile/setProfile',
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
  'profile/updateProfile',
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

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: {} as ProfileResponseType,
    status: 'idle' as StatusType,
  },
  reducers: {
    setProfile(state, action: PayloadAction<ProfileResponseType>) {
      state.profile = action.payload;
    },
    setProfileStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProfile.fulfilled, (state, actions) => {
        state.profile = actions.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export const { setProfile, setProfileStatus } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
