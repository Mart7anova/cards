import React, { ReactElement } from 'react';

import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { selectProfile } from '../../../profile/selectors';
import { selectCardsStatus, selectPackUserId } from '../../selectors';
import style from '../CardsPage.module.scss';

import { AddCards } from './AddCards/AddCards';

import { Path } from 'common/enums/Path';
import { useAppSelector } from 'common/hooks/useAppSelector';

export const CardButton = (): ReactElement => {
  const { packId } = useParams() as { packId: string };
  const navigate = useNavigate();

  const cardsStatus = useAppSelector(selectCardsStatus);
  const packUserId = useAppSelector(selectPackUserId);
  const { _id } = useAppSelector(selectProfile);

  const isOwner = packUserId === _id;
  const isCardsLoading = cardsStatus === 'loading';

  return (
    <div className={style.btnContainer}>
      <Button
        variant="contained"
        color="success"
        onClick={() => navigate(Path.LEARN + packId)}
        className={style.btn}
        disabled={isCardsLoading}
      >
        <h4>Learn cards</h4>
      </Button>

      {isOwner && <AddCards packId={packId} disabled={isCardsLoading} />}
    </div>
  );
};
