import { AppRootStateType } from 'app/store';
import { StatusType } from 'common/types/Types';
import { CardSearchParamsType, CardType } from 'features/cards/Types';

export const selectPackName = (state: AppRootStateType): string =>
  state.card.cardsState.packName;

export const selectPackUserId = (state: AppRootStateType): string =>
  state.card.cardsState.packUserId;

export const selectCards = (state: AppRootStateType): CardType[] =>
  state.card.cardsState.cards;

export const selectCardsTotalCount = (state: AppRootStateType): number =>
  state.card.cardsState.cardsTotalCount;

export const selectPageCards = (state: AppRootStateType): number =>
  state.card.cardsState.page;

export const selectPageCountCards = (state: AppRootStateType): number =>
  state.card.cardsState.pageCount;

export const selectPackDeckCover = (state: AppRootStateType): string =>
  state.card.cardsState.packDeckCover;

export const selectSearchParamsCards = (state: AppRootStateType): CardSearchParamsType =>
  state.card.cardsSearchParams;

export const selectCardsStatus = (state: AppRootStateType): StatusType =>
  state.card.status;
