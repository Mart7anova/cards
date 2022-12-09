import { AxiosResponse } from 'axios';

import { instance } from 'api/instance';
import {
  CardSearchParamsType,
  CardsResponseType,
  ResponseCardGrade,
} from 'features/cards/Types';

export const cardsApi = {
  getCards(packId: string, params: CardSearchParamsType) {
    return instance.get<CardSearchParamsType, AxiosResponse<CardsResponseType>>(
      `/cards/card?cardsPack_id=${packId}`,
      { params },
    );
  },
  createCard(packId: string, question: string, answer: string, questionImg: string) {
    return instance.post(`/cards/card`, {
      card: {
        cardsPack_id: packId,
        question,
        answer,
        questionImg,
      },
    });
  },
  deleteCard(cardId: string) {
    return instance.delete(`/cards/card?id=${cardId}`);
  },
  updateCard(cardId: string, question: string, answer: string, questionImg: string) {
    return instance.put(`/cards/card`, {
      card: {
        _id: cardId,
        question,
        answer,
        questionImg,
      },
    });
  },
  // eslint-disable-next-line camelcase
  updateCardsGrade(card_id: string, grade: number) {
    return instance.put<ResponseCardGrade>(`/cards/grade`, {
      // eslint-disable-next-line camelcase
      card_id,
      grade,
    });
  },
};
