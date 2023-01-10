import { createAsyncThunk } from '@reduxjs/toolkit';

import { profileApi } from 'api/profile';
import { setProfile, setIsLoggedIn } from 'store/slices';

export const initializeApp = createAsyncThunk(
  'store/initializeApp',
  async (param, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await profileApi.me();

      dispatch(setProfile(data));
      dispatch(setIsLoggedIn(true));
    } catch (e) {
      return rejectWithValue(null);
    }
  },
);
