import { PackSearchParamsType, PackType } from 'api/packs';
import { AppRootStateType } from 'store/index';

export const selectCardPacks = (state: AppRootStateType): PackType[] =>
  state.pack.packs.cardPacks;

export const selectPacksPage = (state: AppRootStateType): number => state.pack.packs.page;

export const selectPacksPageCount = (state: AppRootStateType): number =>
  state.pack.packs.pageCount;

export const selectPacksTotalCount = (state: AppRootStateType): number =>
  state.pack.packs.cardPacksTotalCount;

export const selectMinCardsCount = (state: AppRootStateType): number =>
  state.pack.packs.minCardsCount;

export const selectMaxCardsCount = (state: AppRootStateType): number =>
  state.pack.packs.maxCardsCount;

export const selectPackSearchParams = (state: AppRootStateType): PackSearchParamsType =>
  state.pack.packsSearchParams;

export const selectPacksStatus = (state: AppRootStateType): string => state.pack.status;
