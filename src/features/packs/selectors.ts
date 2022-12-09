import { AppRootStateType } from 'app/store';
import { PackSearchParamsType, PackType } from 'features/packs/Types';

export const selectCardPacks = (state: AppRootStateType): PackType[] =>
  state.pack.packs.cardPacks;

export const selectPagePacks = (state: AppRootStateType): number => state.pack.packs.page;

export const selectPageCountPacks = (state: AppRootStateType): number =>
  state.pack.packs.pageCount;

export const selectCardPacksTotalCount = (state: AppRootStateType): number =>
  state.pack.packs.cardPacksTotalCount;

export const selectMinCardsCount = (state: AppRootStateType): number =>
  state.pack.packs.minCardsCount;

export const selectMaxCardsCount = (state: AppRootStateType): number =>
  state.pack.packs.maxCardsCount;

export const selectSearchParams = (state: AppRootStateType): PackSearchParamsType =>
  state.pack.packsSearchParams;

export const selectPacksStatus = (state: AppRootStateType): string => state.pack.status;
