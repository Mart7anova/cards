import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CardSearchParamsType, CardsResponseType, CardType } from 'api/cards';
import { fetchCards, updateCardGrade } from 'store/thunks';
import { StatusType } from 'types';

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
    resetCardsState: state => {
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
  extraReducers: builder => {
    builder
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cardsState = action.payload;
      })
      .addCase(updateCardGrade.fulfilled, (state, action) => {
        const index = state.cardsState.cards.findIndex(
          // eslint-disable-next-line no-underscore-dangle
          (card: CardType) => card._id === action.payload.updatedGrade.card_id,
        );

        state.cardsState.cards[index].grade = action.payload.updatedGrade.grade;
        state.cardsState.cards[index].shots = action.payload.updatedGrade.shots;
      });
  },
});

export const { setCardsStatus, setCardsSearchParams } = cardsSlice.actions;
export const cardReducer = cardsSlice.reducer;
