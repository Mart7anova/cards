import React, { ReactElement } from 'react';

import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';

import { AddCardButton } from 'components/cards/addCardButton';
import { CardMenu } from 'components/cards/cardMenu';
import style from 'components/cardsEmpty/CardsEmpty.module.scss';
import { useAppSelector } from 'hooks';
import {
  selectCardsStatus,
  selectPackDeckCover,
  selectPackName,
  selectPackUserId,
  selectProfile,
} from 'store/selectors';

export const CardsEmpty = (): ReactElement => {
  const { packId } = useParams() as { packId: string };

  const packName = useAppSelector(selectPackName);
  const packUserId = useAppSelector(selectPackUserId);
  const packDeckCover = useAppSelector(selectPackDeckCover);
  const { _id } = useAppSelector(selectProfile);
  const cardsStatus = useAppSelector(selectCardsStatus);

  const isOwner = packUserId === _id;
  const isCardLoading = cardsStatus === 'loading';

  return (
    <Container fixed sx={{ mt: 5 }}>
      <h1 className={style.titleName}>
        {packName}
        {isOwner && <CardMenu />}
        {packDeckCover && <img src={packDeckCover} className={style.img} alt="" />}
      </h1>
      {isOwner ? (
        <div className={style.infoContainer}>
          <h2 className={style.infoTitle}>
            This pack is empty.
            <br />
            Click <span>add new card</span> to fill this pack.
          </h2>
          <AddCardButton packId={packId} disabled={isCardLoading} />
        </div>
      ) : (
        <div className={style.infoContainer}>
          <h2 className={style.infoTitle}>This pack is empty.</h2>
        </div>
      )}
    </Container>
  );
};
