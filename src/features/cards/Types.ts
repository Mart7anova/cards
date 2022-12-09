export type CardType = {
  answer: string;
  question: string;
  questionImg: string;
  cardsPack_id: string;
  grade: number;
  shots: number;
  user_id: string;
  created: Date;
  updated: Date;
  _id: string;
};
export type CardsResponseType = {
  cards: CardType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  packDeckCover: string;
  packName: string;
  packUserId: string;
  page: number;
  pageCount: number;
};

export type CardSearchParamsType = {
  cardQuestion?: string;
  cardsPack_id?: number;
  min?: number;
  max?: number;
  sortCards?: string;
  page?: number;
  pageCount?: number;
};

export type ResponseCardGrade = {
  token: string;
  tokenDeathTime: number;
  updatedGrade: {
    card_id: string;
    cardsPack_id: string;
    created: string;
    grade: number;
    more_id: string;
    shots: number;
    updated: string;
    user_id: string;
    __v: number;
    _id: string;
  };
};
