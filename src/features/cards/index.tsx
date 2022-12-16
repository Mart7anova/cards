import React, { ReactElement, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { CardsPage } from './CardsPage/CardsPage';
import { EmptyCardsPage } from './EmptyCardsPage/EmptyCardsPage';
import {
  selectCardsStatus,
  selectCardsTotalCount,
  selectSearchParamsCards,
} from './selectors';
import { fetchCards } from './slice';

import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { CardsPageSkeleton } from 'features/cards/CardsPageSkeleton/CardsPageSkeleton';

export const Cards = (): ReactElement => {
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

  return haveCards ? <CardsPage setIsSearching={setIsSearching} /> : <EmptyCardsPage />;
};
