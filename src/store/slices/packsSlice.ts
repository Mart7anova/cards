import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PackSearchParamsType, PackType, ResponseCardPacksType } from 'api/packs';
import { fetchPacks } from 'store/thunks';
import { StatusType } from 'types';

const packsSlice = createSlice({
  name: 'packs',
  initialState: {
    packs: {
      cardPacks: [] as PackType[],
    } as ResponseCardPacksType,
    packsSearchParams: {
      page: 1,
      pageCount: 5,
      packName: '',
    } as PackSearchParamsType,
    isFirstLoading: true,
    status: 'idle' as StatusType,
  },
  reducers: {
    setPacksSearchParams: (state, action: PayloadAction<PackSearchParamsType>) => {
      state.packsSearchParams = { ...state.packsSearchParams, ...action.payload };
    },
    clearSearchParams: state => {
      const initialState = packsSlice.getInitialState();

      state.packsSearchParams = initialState.packsSearchParams;
    },
    setIsMyPacksFilter: (state, action: PayloadAction<string>) => {
      state.packsSearchParams.user_id = action.payload;
      state.packsSearchParams.page = 1;
    },
    changeStatusFirstLoading: state => {
      state.isFirstLoading = true;
    },
    setPacksStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPacks.fulfilled, (state, action) => {
      state.packs = action.payload;
      if (state.isFirstLoading) {
        state.packsSearchParams.min = action.payload.minCardsCount;
        state.packsSearchParams.max = action.payload.maxCardsCount;
        state.isFirstLoading = false;
      }
    });
  },
});

export const {
  setPacksStatus,
  setIsMyPacksFilter,
  setPacksSearchParams,
  clearSearchParams,
  changeStatusFirstLoading,
} = packsSlice.actions;
export const packReducer = packsSlice.reducer;
