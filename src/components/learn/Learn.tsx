import React, { ReactElement, useEffect, useState } from 'react';

import { Button, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

import { CardType } from 'api/cards';
import { Answer } from 'components/learn/answer';
import style from 'components/learn/Learn.module.scss';
import { LearnPageSkeleton } from 'components/learn/learnPageSkeleton';
import { Question } from 'components/learn/question';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  selectCards,
  selectCardsStatus,
  selectPackName,
} from 'store/selectors/cardsSelectors';
import { fetchCards } from 'store/thunks';
import { getRandomCard } from 'utils';

export const Learn = (): ReactElement => {
  const dispatch = useAppDispatch();

  const { packId } = useParams() as { packId: string };

  const packName = useAppSelector(selectPackName);
  const cards = useAppSelector(selectCards);
  const cardsStatus = useAppSelector(selectCardsStatus);

  const [first, setFirst] = useState<boolean>(true);
  const [card, setCard] = useState<CardType>({} as CardType);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (first) {
      dispatch(fetchCards({ packId }));
      setFirst(false);
    }
    if (cards.length > 0) {
      setCard(getRandomCard(cards));
    }
  }, [packId, cards, first]);

  const answerShowHandler = (value: boolean) => {
    return () => setShowAnswer(value);
  };

  if (cardsStatus === 'loading') {
    return <LearnPageSkeleton />;
  }

  return (
    <div className={style.mainContainer}>
      <Paper className={style.paper}>
        <h1 className={style.title}>{packName}</h1>

        <p className={style.infoText}>
          Number of attempts to answer the question:
          <span className={style.infoNumber}>{card.shots}</span>
        </p>

        <Question card={card} />

        {!showAnswer && (
          <Button onClick={answerShowHandler(true)} variant="contained" sx={{ mt: 2 }}>
            Show answer
          </Button>
        )}
        {showAnswer && <Answer card={card} hideAnswer={answerShowHandler(false)} />}
      </Paper>
    </div>
  );
};
