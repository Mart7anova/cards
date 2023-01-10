import React, { ChangeEvent, ReactElement, useState } from 'react';

import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';

import { CardType } from 'api/cards';
import style from 'components/learn/Learn.module.scss';
import { useAppDispatch } from 'hooks';
import { updateCardGrade } from 'store/thunks';

const GRADES = [
  { title: 'Did not know', value: 1 },
  { title: 'Forgot', value: 2 },
  { title: 'A lot of thought', value: 3 },
  { title: 'Confused', value: 4 },
  { title: 'Knew the answer', value: 5 },
];

type PropsType = {
  card: CardType;
  hideAnswer: () => void;
};

export const Answer = ({ card, hideAnswer }: PropsType): ReactElement => {
  const dispatch = useAppDispatch();
  const [grade, setGrade] = useState(0);

  const gradesChangeHandler = (e: ChangeEvent<HTMLInputElement>, value: number): void => {
    if (e.currentTarget.checked) {
      setGrade(value);
    } else {
      setGrade(0);
    }
  };

  const nextClickHandler = (): void => {
    hideAnswer();
    // eslint-disable-next-line no-underscore-dangle
    dispatch(updateCardGrade({ cardId: card._id, grade }));
    setGrade(0);
  };

  return (
    <>
      <h2 className={style.textContainer}>
        Answer: <span className={style.text}>{card.answer}</span>
      </h2>

      {GRADES.map(({ title, value }) => (
        <RadioGroup
          key={title}
          value={grade}
          onChange={e => gradesChangeHandler(e, value)}
        >
          <FormControlLabel control={<Radio />} label={title} value={value} />
        </RadioGroup>
      ))}

      <Button
        onClick={nextClickHandler}
        disabled={grade === 0}
        sx={{ mt: 2 }}
        variant="contained"
      >
        Next
      </Button>
    </>
  );
};
