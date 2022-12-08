import { AppRootStateType } from 'app/store';

export const getCardPacks = (state: AppRootStateType) => state.pack.packs.cardPacks;
export const getPagePacks = (state: AppRootStateType) => state.pack.packs.page;
export const getPageCountPacks = (state: AppRootStateType) => state.pack.packs.pageCount;
export const getCardPacksTotalCount = (state: AppRootStateType) => state.pack.packs.cardPacksTotalCount;

export const getMinCardsCount = (state: AppRootStateType) => state.pack.packs.minCardsCount;
export const getMaxCardsCount = (state: AppRootStateType) => state.pack.packs.maxCardsCount;


export const getSearchParams = (state: AppRootStateType) => state.pack.packsSearchParams;
export const getIsFirstLoading = (state: AppRootStateType) => state.pack.isFirstLoading;
export const getPacksStatus = (state: AppRootStateType) => state.pack.status;