import React, { ReactElement } from 'react';

import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';

import { selectUserProfile } from '../../profile/selectors';
import { CardMenu } from '../CardMenu/CardMenu';
import { AddCards } from '../CardsPage/CardButton/AddCards/AddCards';
import {
  selectCardsStatus,
  selectPackDeckCover,
  selectPackName,
  selectPackUserId,
} from '../selectors';

import style from './EmptyCardsPage.module.scss';

import { useAppSelector } from 'common/hooks/useAppSelector';

export const EmptyCardsPage = (): ReactElement => {
  const { packId } = useParams() as { packId: string };

  const packName = useAppSelector(selectPackName);
  const packUserId = useAppSelector(selectPackUserId);
  const packDeckCover = useAppSelector(selectPackDeckCover);
  const { _id } = useAppSelector(selectUserProfile);
  const cardsStatus = useAppSelector(selectCardsStatus);

  const IS_OWNER = packUserId === _id;
  const IS_CARDS_LOADING = cardsStatus === 'loading';

  return (
    <Container fixed sx={{ mt: 5 }}>
      <h1 className={style.titleName}>
        {packName}
        {IS_OWNER && <CardMenu />}
        {packDeckCover && <img src={packDeckCover} className={style.img} alt="" />}
      </h1>
      {IS_OWNER ? (
        <div className={style.infoContainer}>
          <h2 className={style.infoTitle}>
            This pack is empty.
            <br />
            Click <span>add new card</span> to fill this pack.
          </h2>
          <AddCards packId={packId} disabled={IS_CARDS_LOADING} />
        </div>
      ) : (
        <div className={style.infoContainer}>
          <h2 className={style.infoTitle}>This pack is empty.</h2>
        </div>
      )}
    </Container>
  );
};
