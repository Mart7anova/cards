import { AppRootStateType } from 'app/store';

export const getPackName = (state: AppRootStateType) => state.card.cardsState.packName;
export const getPackUserId = (state: AppRootStateType) => state.card.cardsState.packUserId;

export const getCards = (state: AppRootStateType) => state.card.cardsState.cards;
export const getCardsTotalCount = (state: AppRootStateType) => state.card.cardsState.cardsTotalCount;
export const getPageCards = (state: AppRootStateType) => state.card.cardsState.page;
export const getPageCountCards = (state: AppRootStateType) => state.card.cardsState.pageCount;
export const getMaxGradeCards = (state: AppRootStateType) => state.card.cardsState.maxGrade;
export const getMinGradeCards = (state: AppRootStateType) => state.card.cardsState.minGrade;
export const getPackDeckCover = (state: AppRootStateType) => state.card.cardsState.packDeckCover;

export const getSearchParamsCards = (state: AppRootStateType) => state.card.cardsSearchParams;

export const getCardsStatus = (state: AppRootStateType) => state.card.status;

