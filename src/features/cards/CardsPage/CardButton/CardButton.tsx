import React from 'react';
import style from '../CardsPage.module.scss';
import { Button } from '@mui/material';
import { PATH } from 'common/enums/path';
import { AddCards } from './AddCards/AddCards';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectCardsStatus, selectPackUserId } from '../../selectors';
import { selectUserProfile } from '../../../profile/selectors';

export const CardButton = () => {
  const { packId } = useParams() as { packId: string };
  const navigate = useNavigate();

  const cardsStatus = useAppSelector(selectCardsStatus);
  const packUserId = useAppSelector(selectPackUserId);
  const { _id } = useAppSelector(selectUserProfile);

  const isOwner = packUserId === _id;
  const isCardsLoading = cardsStatus === 'loading';

  return (
    <div className={style.btnContainer}>
      <Button variant={'contained'}
              color={'success'}
              onClick={() => navigate(PATH.LEARN + packId)}
              className={style.btn}
              disabled={isCardsLoading}
      >
        <h4>Learn cards</h4>
      </Button>

      {
        isOwner && <AddCards packId={packId} disabled={isCardsLoading} />
      }
    </div>
  );
};
