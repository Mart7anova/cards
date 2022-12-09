import React, { ReactElement, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { CardsPage } from './CardsPage/CardsPage';
import { EmptyCardsPage } from './EmptyCardsPage/EmptyCardsPage';
import {
  selectCardsStatus,
  selectCardsTotalCount,
  selectSearchParamsCards,
} from './selectors';
import { SkeletonCardPage } from './SkeletonCardPage/SkeletonCardPage';
import { fetchCards } from './slice';

import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';

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

  const HAVE_CARDS = cardsTotalCount > 0 || isSearching;
  const IS_CARDS_LOADING = !isSearching && cardsStatus === 'loading';

  useEffect(() => {
    dispatch(fetchCards({ packId }));
  }, [sortCards, cardsPackId, cardQuestion, min, page, pageCount, max, packId]);

  if (IS_CARDS_LOADING) {
    return <SkeletonCardPage />;
  }

  return HAVE_CARDS ? <CardsPage setIsSearching={setIsSearching} /> : <EmptyCardsPage />;
};
