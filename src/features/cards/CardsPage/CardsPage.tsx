import React, { ReactElement } from 'react';

import { Container } from '@mui/material';

import { selectCards, selectCardsStatus } from '../selectors';

import { CardButton } from './CardButton/CardButton';
import style from './CardsPage.module.scss';
import { CardTable } from './CardTable/CardTable';
import { CardTitle } from './CardTitle/CardTitle';

import { SearchByName } from 'common/components/SearchByName/SearchByName';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { setCardsSearchParams } from 'features/cards/slice';
import { EmptyTable } from 'features/packs/EmptyTable/EmptyTable';

type PropsType = {
  setIsSearching: (isSearching: boolean) => void;
};

export const CardsPage = ({ setIsSearching }: PropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const cards = useAppSelector(selectCards);
  const cardsStatus = useAppSelector(selectCardsStatus);

  const isCardLoading = cardsStatus === 'loading';
  const haveCards = !!cards.length;

  const setSearchParam = (): ((searchParam: string) => void) => {
    setIsSearching(true);

    return (searchParam: string) => {
      dispatch(setCardsSearchParams({ cardQuestion: searchParam }));
    };
  };

  return (
    <Container fixed>
      <div className={style.titleContainer}>
        <CardTitle />
        <CardButton />
      </div>

      <SearchByName
        title="Search by question name"
        setSearchParam={setSearchParam()}
        disabled={isCardLoading}
        fullWidth
      />

      {haveCards ? (
        <CardTable setIsSearching={setIsSearching} />
      ) : (
        <EmptyTable isLoading={isCardLoading} />
      )}
    </Container>
  );
};
