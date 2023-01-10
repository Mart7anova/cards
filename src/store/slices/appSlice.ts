import { createSlice } from '@reduxjs/toolkit';

import { initializeApp } from 'store/thunks';
import { InfoType } from 'types';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isInitialized: false,
    error: null as InfoType,
    success: null as InfoType,
  },
  reducers: {
    setAppError: (state, action) => {
      state.error = action.payload;
    },
    setAppSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initializeApp.fulfilled, state => {
        state.isInitialized = true;
      })
      .addCase(initializeApp.rejected, state => {
        state.isInitialized = true;
      });
  },
});

export const { setAppSuccess, setAppError } = appSlice.actions;
export const appReducer = appSlice.reducer;
