import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { forgotPassword, signIn, signOut, signUp, updatePassword } from 'store/thunks';
import { StatusType } from 'types';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isSignedUp: false,
    isPasswordChanging: false,
    email: '',
    status: 'idle' as StatusType,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setAuthStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.fulfilled, state => {
        state.isSignedUp = true;
      })
      .addCase(signIn.fulfilled, state => {
        state.isLoggedIn = true;
        state.isSignedUp = true;
      })
      .addCase(signOut.fulfilled, state => {
        state.isLoggedIn = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isPasswordChanging = true;
        state.email = action.payload;
      })
      .addCase(updatePassword.fulfilled, state => {
        state.isPasswordChanging = false;
        state.isSignedUp = true;
        state.email = '';
      });
  },
});

export const { setIsLoggedIn, setAuthStatus } = authSlice.actions;
export const authReducer = authSlice.reducer;
