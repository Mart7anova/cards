export type PackType = {
  cardsCount: number;
  created: Date;
  deckCover: string;
  grade: number;
  more_id: string;
  name: string;
  path: string;
  private: boolean;
  rating: number;
  shots: number;
  type: string;
  updated: Date;
  user_id: string;
  user_name: string;
  __v: number;
  _id: string;
};
export type ResponseCardPacksType = {
  cardPacks: PackType[];
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
};
export type PackSearchParamsType = {
  page?: number;
  pageCount?: number;
  sortPacks?: string;
  packName?: string;
  user_id?: string;
  min?: number;
  max?: number;
};
