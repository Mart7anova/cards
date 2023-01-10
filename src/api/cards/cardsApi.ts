import { AxiosResponse } from 'axios';

import { instance } from 'api';
import {
  CardSearchParamsType,
  CardsResponseType,
  ResponseCardGrade,
} from 'api/cards/types';
import { PathApi } from 'enums';

export const cardsApi = {
  getCards(packId: string, params: CardSearchParamsType) {
    return instance.get<CardSearchParamsType, AxiosResponse<CardsResponseType>>(
      `${PathApi.CARD}?cardsPack_id=${packId}`,
      { params },
    );
  },
  createCard(packId: string, question: string, answer: string, questionImg: string) {
    return instance.post(PathApi.CARD, {
      card: {
        cardsPack_id: packId,
        question,
        answer,
        questionImg,
      },
    });
  },
  deleteCard(cardId: string) {
    return instance.delete(`${PathApi.CARD}?id=${cardId}`);
  },
  updateCard(cardId: string, question: string, answer: string, questionImg: string) {
    return instance.put(PathApi.CARD, {
      card: {
        _id: cardId,
        question,
        answer,
        questionImg,
      },
    });
  },
  updateCardsGrade(cardId: string, grade: number) {
    return instance.put<ResponseCardGrade>(PathApi.CARD_GRADE, {
      card_id: cardId,
      grade,
    });
  },
};
