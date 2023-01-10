import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UsersResponseType, UsersSearchParamsType, UserType } from 'api/users';
import { AppStatus } from 'enums';
import { fetchUsers } from 'store/thunks';
import { StatusType } from 'types';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: {
      users: [] as UserType[],
    } as UsersResponseType,
    usersSearchParams: {
      pageCount: 10,
    } as UsersSearchParamsType,
    status: AppStatus.idle as StatusType,
  },
  reducers: {
    setUserStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
    setUsersSearchParams: (state, action: PayloadAction<UsersSearchParamsType>) => {
      state.usersSearchParams = { ...state.usersSearchParams, ...action.payload };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, actions) => {
      state.users = actions.payload;
    });
  },
});

export const { setUserStatus, setUsersSearchParams } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
