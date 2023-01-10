import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserType } from 'api/users/types';
import { AppStatus } from 'enums';
import { fetchUser } from 'store/thunks';
import { StatusType } from 'types';

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    user: {} as UserType,
    status: AppStatus.idle as StatusType,
  },
  reducers: {
    setUserProfileStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.fulfilled, (state, actions) => {
      state.user = actions.payload.user;
    });
  },
});

export const { setUserProfileStatus } = userProfileSlice.actions;
export const userProfileReducer = userProfileSlice.reducer;
