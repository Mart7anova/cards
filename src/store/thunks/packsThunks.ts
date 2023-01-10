import { createAsyncThunk } from '@reduxjs/toolkit';

import { packApi } from 'api/packs';
import { AppRootStateType } from 'store/index';
import { setPacksStatus } from 'store/slices';
import { handleNetworkError } from 'utils';

export const fetchPacks = createAsyncThunk(
  'packs/fetchPacks',
  async (param, { dispatch, getState, rejectWithValue }) => {
    dispatch(setPacksStatus('loading'));
    try {
      const state = getState() as AppRootStateType;
      const searchParams = state.pack.packsSearchParams;

      const { data } = await packApi.getPacks(searchParams);

      return data;
    } catch (e) {
      handleNetworkError(e, dispatch);

      return rejectWithValue(null);
    } finally {
      dispatch(setPacksStatus('idle'));
    }
  },
);

export const createNewPack = createAsyncThunk(
  'packs/createNewPack',
  async (
    param: { name: string; isPrivate: boolean; deckCover: string },
    { dispatch, rejectWithValue },
  ) => {
    dispatch(setPacksStatus('loading'));
    try {
      await packApi.createPack(param.name, param.isPrivate, param.deckCover);
    } catch (e) {
      handleNetworkError(e, dispatch);

      return rejectWithValue(null);
    }
  },
);
export const deletePack = createAsyncThunk(
  'packs/deletePack',
  async (param: { id: string }, { dispatch, rejectWithValue }) => {
    dispatch(setPacksStatus('loading'));
    try {
      await packApi.deletePack(param.id);
    } catch (e) {
      handleNetworkError(e, dispatch);

      return rejectWithValue(null);
    } finally {
      dispatch(setPacksStatus('idle'));
    }
  },
);
export const updatePack = createAsyncThunk(
  'packs/updatePack',
  async (
    param: { id: string; name: string; isPrivate: boolean; deckCover: string },
    { dispatch, rejectWithValue },
  ) => {
    dispatch(setPacksStatus('loading'));
    try {
      await packApi.updatePack(param.id, param.name, param.isPrivate, param.deckCover);
    } catch (e) {
      handleNetworkError(e, dispatch);

      return rejectWithValue(null);
    } finally {
      dispatch(setPacksStatus('idle'));
    }
  },
);
