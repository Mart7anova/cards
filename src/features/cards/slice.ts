import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cardsApi, CardSearchParamsType, CardsResponseType, CardType } from './api';
import { AppRootStateType } from 'app/store';
import { handleNetworkError } from 'common/utils/handleNetworkError';
import { StatusType } from 'common/types/StatusType';

export const fetchCards = createAsyncThunk('cards/fetchCards',
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
  });

export const createCard = createAsyncThunk('cards/createCard',
  async (param: { packId: string, question: string, answer: string, questionImg: string },
         { dispatch, rejectWithValue }) => {
    dispatch(setCardsStatus('loading'));
    try {
      await cardsApi.createCard(param.packId, param.question, param.answer, param.questionImg);
    } catch (e) {
      handleNetworkError(e, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(setCardsStatus('idle'));
    }
  });

export const deleteCard = createAsyncThunk('cards/deleteCard',
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
  });

export const updateCard = createAsyncThunk('cards/updateCard',
  async (param: { cardId: string, question: string, answer: string, questionImg: string },
         { dispatch, rejectWithValue }) => {
    dispatch(setCardsStatus('loading'));
    try {
      await cardsApi.updateCard(param.cardId, param.question, param.answer, param.questionImg);
    } catch (e) {
      handleNetworkError(e, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(setCardsStatus('idle'));
    }
  });

export const updateCardGrade = createAsyncThunk('cards/updateCardGrade',
  async (param: { card_id: string, grade: number }, { dispatch, rejectWithValue }) => {
    dispatch(setCardsStatus('loading'));
    try {
      const { data } = await cardsApi.updateCardsGrade(param.card_id, param.grade);
      return data;
    } catch (e) {
      handleNetworkError(e, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(setCardsStatus('idle'));
    }
  });


const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    cardsState: {
      cards: [] as CardType[],
    } as CardsResponseType,
    cardsSearchParams: {
      page: 1,
      pageCount: 5,
      cardQuestion: '',
    } as CardSearchParamsType,
    status: 'idle' as StatusType,
  },
  reducers: {
    resetCardsState: (state) => {
      const initialState = cardsSlice.getInitialState();
      state.cardsSearchParams = initialState.cardsSearchParams;
      state.cardsState = initialState.cardsState;
    },
    setCardsSearchParams: (state, action: PayloadAction<CardSearchParamsType>) => {
      state.cardsSearchParams = { ...state.cardsSearchParams, ...action.payload };
    },
    setCardsStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cardsState = action.payload;
      })
      .addCase(updateCardGrade.fulfilled, (state, action) => {
        const index = state.cardsState.cards.findIndex(s => s._id === action.payload.updatedGrade.card_id);
        state.cardsState.cards[index].grade = action.payload.updatedGrade.grade;
        state.cardsState.cards[index].shots = action.payload.updatedGrade.shots;
      });
  },
});

export const {
  setCardsStatus,
  setCardsSearchParams,
  resetCardsState,
} = cardsSlice.actions;
export const cardReducer = cardsSlice.reducer;