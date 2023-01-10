import { createAsyncThunk } from '@reduxjs/toolkit';

import { authApi } from 'api/auth';
import { setAuthStatus, setAppError, setAppSuccess, setProfile } from 'store/slices';
import { handleNetworkError } from 'utils';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (param: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    dispatch(setAuthStatus('loading'));
    try {
      const res = await authApi.signUp(param.email, param.password);

      dispatch(setAppSuccess(res.statusText));
    } catch (e) {
      handleNetworkError(e, dispatch);

      return rejectWithValue(null);
    } finally {
      dispatch(setAuthStatus('idle'));
    }
  },
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (
    param: { email: string; password: string; rememberMe: boolean },
    { dispatch, rejectWithValue },
  ) => {
    dispatch(setAuthStatus('loading'));
    try {
      const { data } = await authApi.signIn(
        param.email,
        param.password,
        param.rememberMe,
      );

      dispatch(setProfile(data));
    } catch (e) {
      dispatch(setAppError('incorrect email or password'));

      return rejectWithValue(null);
    } finally {
      dispatch(setAuthStatus('idle'));
    }
  },
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (param, { dispatch, rejectWithValue }) => {
    dispatch(setAuthStatus('loading'));
    try {
      const res = await authApi.signOut();

      dispatch(setAppSuccess(res.data.info));
    } catch (e) {
      handleNetworkError(e, dispatch);

      return rejectWithValue(null);
    } finally {
      dispatch(setAuthStatus('idle'));
    }
  },
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPass',
  async (param: { email: string }, { dispatch, rejectWithValue }) => {
    dispatch(setAuthStatus('loading'));
    try {
      const { email } = param;

      await authApi.forgotPass({
        email,
        from: 'test-front-admin <1@gmail.com>',
        message: `<div>Перейдите по ссылке, чтобы продолжить востановление пароля <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`,
      });

      return email;
    } catch (e) {
      handleNetworkError(e, dispatch);

      return rejectWithValue(null);
    } finally {
      dispatch(setAuthStatus('idle'));
    }
  },
);

export const updatePassword = createAsyncThunk(
  'auth/updatePass',
  async (param: { password: string; token: string }, { dispatch, rejectWithValue }) => {
    dispatch(setAuthStatus('loading'));
    try {
      const res = await authApi.setNewPass(param.password, param.token);

      dispatch(setAppSuccess(res.data.info));
    } catch (e) {
      handleNetworkError(e, dispatch);

      return rejectWithValue(null);
    } finally {
      dispatch(setAuthStatus('idle'));
    }
  },
);
