import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppStatus } from 'common/enums/AppStatus';
import { StatusType } from 'common/types/Types';
import { handleNetworkError } from 'common/utils/handleNetworkError';
import { userApi } from 'features/users/api';
import { UserType } from 'features/users/Types';

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
