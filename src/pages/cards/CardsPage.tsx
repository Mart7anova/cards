import React, { ReactElement, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Cards } from 'components/cards';
import { CardsEmpty } from 'components/cardsEmpty';
import { CardsPageSkeleton } from 'components/cardsPageSkeleton';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  selectCardsStatus,
  selectCardsTotalCount,
  selectSearchParamsCards,
} from 'store/selectors';
import { fetchCards } from 'store/thunks';

export const CardsPage = (): ReactElement => {
  const dispatch = useAppDispatch();

  const { packId } = useParams() as { packId: string };

  const [isSearching, setIsSearching] = useState(false);

  const cardsTotalCount = useAppSelector(selectCardsTotalCount);
  const cardsStatus = useAppSelector(selectCardsStatus);
  const {
    sortCards,
    cardsPack_id: cardsPackId,
    cardQuestion,
    min,
    page,
    pageCount,
    max,
  } = useAppSelector(selectSearchParamsCards);

  const haveCards = cardsTotalCount > 0 || isSearching;
  const isCardsLoading = !isSearching && cardsStatus === 'loading';

  useEffect(() => {
    dispatch(fetchCards({ packId }));
  }, [sortCards, cardsPackId, cardQuestion, min, page, pageCount, max, packId]);

  if (isCardsLoading) {
    return <CardsPageSkeleton />;
  }

  return haveCards ? <Cards setIsSearching={setIsSearching} /> : <CardsEmpty />;
};
