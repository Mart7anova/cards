import { Container } from '@mui/material';
import React from 'react';
import { useAppSelector } from 'common/hooks/useAppSelector';
import {
  selectCardsStatus,
  selectPackDeckCover,
  selectPackName,
  selectPackUserId,
} from '../selectors';
import { CardMenu } from '../CardMenu/CardMenu';
import { useParams } from 'react-router-dom';
import { selectUserProfile } from '../../profile/selectors';
import { AddCards } from '../CardsPage/CardButton/AddCards/AddCards';
import style from './EmptyCardsPage.module.scss';

export const EmptyCardsPage = () => {
  const { packId } = useParams() as { packId: string };

  const packName = useAppSelector(selectPackName);
  const packUserId = useAppSelector(selectPackUserId);
  const packDeckCover = useAppSelector(selectPackDeckCover);
  const { _id } = useAppSelector(selectUserProfile);
  const cardsStatus = useAppSelector(selectCardsStatus);

  const isOwner = packUserId === _id;
  const isCardsLoading = cardsStatus === 'loading';

  return (
    <Container fixed sx={{ mt: 5 }}>
      <h1 className={style.titleName}>
        {packName}
        {
          isOwner && <CardMenu />
        }
        {
          packDeckCover && <img src={packDeckCover} className={style.img} alt={''} />
        }
      </h1>
      {
        isOwner
          ? <div className={style.infoContainer}>
            <h2 className={style.infoTitle}>
              This pack is empty.
              <br />
              Click <span>add new card</span> to fill this pack.
            </h2>
            <AddCards packId={packId} disabled={isCardsLoading} />
          </div>

          : <div className={style.infoContainer}>
            <h2 className={style.infoTitle}>
              This pack is empty.
            </h2>
          </div>
      }
    </Container>
  );
};
