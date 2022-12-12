import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppRootStateType } from 'app/store';
import { StatusType } from 'common/types/Types';
import { handleNetworkError } from 'common/utils/handleNetworkError';
import { userApi } from 'features/users/api';
import { UsersResponseType, UserType } from 'features/users/Types';

export const fetchUsers = createAsyncThunk(
  'User/getUsers',
  async (param, { rejectWithValue, dispatch, getState }) => {
    dispatch(setProfileStatus('loading'));
    try {
      const state = getState() as AppRootStateType;
      const searchParams = state.user.usersSearchParams;

      const { data } = await userApi.getUsers(searchParams);

      return data;
    } catch (e) {
      handleNetworkError(e, dispatch);

      return rejectWithValue(null);
    } finally {
      dispatch(setProfileStatus('idle'));
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: {
      users: [] as UserType[],
    } as UsersResponseType,
    usersSearchParams: {
      pageCount: 10,
    } as UsersResponseType,
    status: 'idle' as StatusType,
  },
  reducers: {
    setProfileStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, actions) => {
      state.users = actions.payload;
    });
  },
});

export const { setProfileStatus } = userSlice.actions;
export const userReducer = userSlice.reducer;
