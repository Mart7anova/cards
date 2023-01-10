import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProfileResponseType } from 'api/profile';
import { getProfile, updateProfile } from 'store/thunks';
import { StatusType } from 'types';

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
