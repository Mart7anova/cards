import React, { ReactElement } from 'react';

import { Container } from '@mui/material';

import { CardButton } from 'components/cards/cardButtons';
import style from 'components/cards/Cards.module.scss';
import { CardTable } from 'components/cards/cardsTable';
import { CardTitle } from 'components/cards/cardTitle';
import { SearchByName } from 'components/common';
import { EmptyTable } from 'components/common/emptyTable';
import { useAppDispatch, useAppSelector } from 'hooks';
import { selectCards, selectCardsStatus } from 'store/selectors';
import { setCardsSearchParams } from 'store/slices';

type PropsType = {
  setIsSearching: (isSearching: boolean) => void;
};

export const Cards = ({ setIsSearching }: PropsType): ReactElement => {
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
