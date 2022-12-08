import React, { useEffect, useState } from 'react';
import { Button, Paper } from '@mui/material';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { getCards, getCardsStatus, getPackName } from '../selectors';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { CardType } from '../api';
import { getRandomCard } from 'common/utils/getCardRamdom';
import style from './Learn.module.scss';
import { Progress } from 'common/components/Progress/ProgressBar';
import { fetchCards } from '../slice';
import { Answer } from './Answer/Answer';
import { Question } from './Question/Question';


export const Learn = () => {
  const dispatch = useAppDispatch();
  const { packId } = useParams() as { packId: string };

  const packName = useAppSelector(getPackName);
  const cards = useAppSelector(getCards);
  const cardsStatus = useAppSelector(getCardsStatus);

  const [first, setFirst] = useState<boolean>(true);
  const [card, setCard] = useState<CardType>({} as CardType);
  const [showAnswer, setShowAnswer] = useState(false);

  const answerShowHandler = (value: boolean) => {
    return () => setShowAnswer(value);
  };

  useEffect(() => {
    if (first) {
      dispatch(fetchCards({ packId }));
      setFirst(false);
    }
    if (cards.length > 0) {
      setCard(getRandomCard(cards));
    }
  }, [packId, cards, first]);

  if (cardsStatus === 'loading') {
    return <Progress />;
  }

  return (
    <div className={style.mainContainer}>
      <Paper className={style.paper}>
        <h1 className={style.title}>{packName}</h1>

        <p className={style.infoText}>
          Number of attempts to answer the question:

          <span className={style.infoNumber}>
                        {card.shots}
                    </span>
        </p>

        <Question card={card} />

        {
          !showAnswer && <Button onClick={answerShowHandler(true)}
                                 variant={'contained'}
                                 sx={{ mt: 2 }}
          >Show answer</Button>
        }
        {
          showAnswer && <Answer card={card} hideAnswer={answerShowHandler(false)} />
        }
      </Paper>
    </div>
  );
};
