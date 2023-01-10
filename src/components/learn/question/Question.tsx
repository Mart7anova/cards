import React, { ReactElement } from 'react';

import { CardType } from 'api/cards';
import style from 'components/learn/Learn.module.scss';
import { addAlternateSrc } from 'utils';

type PropsType = {
  card: CardType;
};

export const Question = ({ card }: PropsType): ReactElement => {
  return (
    <>
      <h2 className={style.textContainer}>
        Question:
        {card.question !== 'no question' && (
          <span className={style.text}> {card.question}?</span>
        )}
      </h2>

      {card.questionImg && (
        <div className={style.wrapperImg}>
          <img
            src={card.questionImg}
            onError={addAlternateSrc}
            alt="pack name"
            className={style.img}
          />
        </div>
      )}
    </>
  );
};
