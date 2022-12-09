import React, { ReactElement } from 'react';

import { Container } from '@mui/material';

import { selectCards, selectCardsStatus } from '../selectors';

import { CardButton } from './CardButton/CardButton';
import style from './CardsPage.module.scss';
import { CardTable } from './CardTable/CardTable';
import { CardTitle } from './CardTitle/CardTitle';
import { SearchByCardName } from './SearchByCardName/SearchByCardName';

import { NoItems } from 'common/components/NoItems/NoItems';
import { useAppSelector } from 'common/hooks/useAppSelector';

type PropsType = {
  setIsSearching: (isSearching: boolean) => void;
};

export const CardsPage = ({ setIsSearching }: PropsType): ReactElement => {
  const cards = useAppSelector(selectCards);
  const cardsStatus = useAppSelector(selectCardsStatus);

  const IS_CARDS_LOADING = cardsStatus === 'loading';
  const HAVE_CARDS = !!cards.length;

  return (
    <Container fixed>
      <div className={style.titleContainer}>
        <CardTitle />
        <CardButton />
      </div>

      <SearchByCardName setIsSearching={setIsSearching} />

      {HAVE_CARDS ? (
        <CardTable setIsSearching={setIsSearching} />
      ) : (
        <NoItems isLoading={IS_CARDS_LOADING} />
      )}
    </Container>
  );
};
