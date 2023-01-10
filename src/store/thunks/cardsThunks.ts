import { createAsyncThunk } from '@reduxjs/toolkit';

import { cardsApi } from 'api/cards';
import { AppRootStateType } from 'store/index';
import { setCardsStatus } from 'store/slices';
import { handleNetworkError } from 'utils';

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (param: { packId: string }, { dispatch, getState, rejectWithValue }) => {
    dispatch(setCardsStatus('loading'));
    try {
      const state = getState() as AppRootStateType;
      const searchParams = state.card.cardsSearchParams;

      const { data } = await cardsApi.getCards(param.packId, searchParams);

      return data;
    } catch (e) {
      handleNetworkError(e, dispatch);

      return rejectWithValue(null);
    } finally {
      dispatch(setCardsStatus('idle'));
    }
  },
);

export const createCard = createAsyncThunk(
  'cards/createCard',
  async (
    param: { packId: string; question: string; answer: string; questionImg: string },
    { dispatch, rejectWithValue },
  ) => {
    dispatch(setCardsStatus('loading'));
    try {
      await cardsApi.createCard(
        param.packId,
        param.question,
        param.answer,
        param.questionImg,
      );
    } catch (e) {
      handleNetworkError(e, dispatch);

      return rejectWithValue(null);
    } finally {
      dispatch(setCardsStatus('idle'));
    }
  },
);

export const deleteCard = createAsyncThunk(
  'cards/deleteCard',
  async (param: { cardId: string }, { dispatch, rejectWithValue }) => {
    dispatch(setCardsStatus('loading'));
    try {
      await cardsApi.deleteCard(param.cardId);
    } catch (e) {
      handleNetworkError(e, dispatch);

      return rejectWithValue(null);
    } finally {
      dispatch(setCardsStatus('idle'));
    }
  },
);

export const updateCard = createAsyncThunk(
  'cards/updateCard',
  async (
    param: { cardId: string; question: string; answer: string; questionImg: string },
    { dispatch, rejectWithValue },
  ) => {
    dispatch(setCardsStatus('loading'));
    try {
      await cardsApi.updateCard(
        param.cardId,
        param.question,
        param.answer,
        param.questionImg,
      );
    } catch (e) {
      handleNetworkError(e, dispatch);

      return rejectWithValue(null);
    } finally {
      dispatch(setCardsStatus('idle'));
    }
  },
);

export const updateCardGrade = createAsyncThunk(
  'cards/updateCardGrade',
  async (param: { cardId: string; grade: number }, { dispatch, rejectWithValue }) => {
    dispatch(setCardsStatus('loading'));
    try {
      const { data } = await cardsApi.updateCardsGrade(param.cardId, param.grade);

      return data;
    } catch (e) {
      handleNetworkError(e, dispatch);

      return rejectWithValue(null);
    } finally {
      dispatch(setCardsStatus('idle'));
    }
  },
);
