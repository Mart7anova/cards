import React, { ReactElement } from 'react';

import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { AddCardButton } from 'components/cards/addCardButton';
import style from 'components/cards/Cards.module.scss';
import { Path } from 'enums';
import { useAppSelector } from 'hooks';
import { selectCardsStatus, selectPackUserId, selectProfile } from 'store/selectors';

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

      {isOwner && <AddCardButton packId={packId} disabled={isCardsLoading} />}
    </div>
  );
};
