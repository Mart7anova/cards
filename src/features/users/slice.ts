import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppRootStateType } from 'app/store';
import { AppStatus } from 'common/enums/AppStatus';
import { StatusType } from 'common/types/Types';
import { handleNetworkError } from 'common/utils/handleNetworkError';
import { PackSearchParamsType } from 'features/packs/Types';
import { userApi } from 'features/users/api';
import { UsersResponseType, UserType } from 'features/users/Types';

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

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: {
      users: [] as UserType[],
    } as UsersResponseType,
    usersSearchParams: {
      pageCount: 10,
    } as UsersResponseType,
    status: AppStatus.idle as StatusType,
  },
  reducers: {
    setUserStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
    setUsersSearchParams: (state, action: PayloadAction<PackSearchParamsType>) => {
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
