import { AppRootStateType } from 'app/store';

export const selectCardPacks = (state: AppRootStateType) => state.pack.packs.cardPacks;
export const selectPagePacks = (state: AppRootStateType) => state.pack.packs.page;
export const selectPageCountPacks = (state: AppRootStateType) => state.pack.packs.pageCount;
export const selectCardPacksTotalCount = (state: AppRootStateType) => state.pack.packs.cardPacksTotalCount;

export const selectMinCardsCount = (state: AppRootStateType) => state.pack.packs.minCardsCount;
export const selectMaxCardsCount = (state: AppRootStateType) => state.pack.packs.maxCardsCount;


export const selectSearchParams = (state: AppRootStateType) => state.pack.packsSearchParams;
export const selectIsFirstLoading = (state: AppRootStateType) => state.pack.isFirstLoading;
export const selectPacksStatus = (state: AppRootStateType) => state.pack.status;