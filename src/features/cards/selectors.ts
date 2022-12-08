import { AppRootStateType } from 'app/store';

export const selectPackName = (state: AppRootStateType) => state.card.cardsState.packName;
export const selectPackUserId = (state: AppRootStateType) => state.card.cardsState.packUserId;

export const selectCards = (state: AppRootStateType) => state.card.cardsState.cards;
export const selectCardsTotalCount = (state: AppRootStateType) => state.card.cardsState.cardsTotalCount;
export const selectPageCards = (state: AppRootStateType) => state.card.cardsState.page;
export const selectPageCountCards = (state: AppRootStateType) => state.card.cardsState.pageCount;
export const selectMaxGradeCards = (state: AppRootStateType) => state.card.cardsState.maxGrade;
export const selectMinGradeCards = (state: AppRootStateType) => state.card.cardsState.minGrade;
export const selectPackDeckCover = (state: AppRootStateType) => state.card.cardsState.packDeckCover;

export const selectSearchParamsCards = (state: AppRootStateType) => state.card.cardsSearchParams;

export const selectCardsStatus = (state: AppRootStateType) => state.card.status;

